import PropTypes from 'prop-types';
import * as React from 'react';
import {
  useState, useEffect, useRef
} from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import JsxParser from 'react-jsx-parser';
import {
  Button, Box, Container, ListItemButton
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import commentService from '../../services/commentService';
import userService from '../../services/userService';
import Comments from '../../models/comment';
import commentboxstyle from './commentboxstyle';

function Comment(props) {
  const { uid, pid, handleCommentState } = props;
  const [username, setUsername] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [editComment, setEditComment] = useState({
    id: -1,
    postId: -1,
    timestamp: '',
    content: '',
    referredUser: [],
    userId: -1
  });
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [checknew, setCheck] = useState(false);
  const [newComment, setComment] = useState({
    id: 1,
    postId: 1,
    timestamp: 'November 05, 2021 14:21:00',
    content: 'I love this post!',
    referredUser: [
      1,
      2,
      3
    ],
    userId: 7
  });
  const [content, setValue] = useState('');
  const [updatecontent, setupdateValue] = useState('');
  const [taggingUsers, settaggingUsers] = useState([
    {
      id: 1,
      display: 'amy'
    }
  ]);
  const firstRendering = useRef(true);
  useEffect(() => {
    async function fetchCommentbyPostId(postid) {
      const data = await commentService.getCommentBypostId(parseInt(postid, 10));
      setCommentList(data);
    }

    async function fetchFollowers(id) {
      const params = `{"userId": ${id}}`;
      // const user = await userService.getUserById(JSON.parse(params));
      // const followerid = user.follows;
      // console.log(followerid);
      const follower = [];
      userService.getUserById(JSON.parse(params)).then((data) => {
        // console.log(data);
        data.follows.forEach(async (user) => {
          const tmpparams = `{"userId": ${user}}`;
          const tmp = await userService.getUserById(JSON.parse(tmpparams));
          follower.push({ id: user, display: tmp.username });
        });
      });
      settaggingUsers(follower);
      // console.log(taggingUsers);
    }

    async function fetchuserinfo(id) {
      const params = `{"userId": ${id}}`;
      const user = await userService.getUserById(JSON.parse(params));
      setUsername(user.username);
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      fetchCommentbyPostId(pid);
      fetchFollowers(uid);
      fetchuserinfo(uid);
    }
  });

  const handleClear = (event) => {
    event.preventDefault();
    handleCommentState();
  };

  const handleChange = (event) => {
    const parse = event.target.value.split('[').join('<b>').split(']').join('</b>');
    setValue(event.target.value);
    setComment((prevState) => ({
      ...prevState,
      content: parse
    }));
  };

  const handleUpdate = (event) => {
    const parse = event.target.value.split('[').join('<b>').split(']').join('</b>');
    setupdateValue(event.target.value);
    setEditComment((prevState) => ({
      ...prevState,
      content: parse
    }));
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    async function addComment() {
      const temp = new Comments();
      temp.postId = parseInt(pid, 10);
      temp.timestamp = newComment.timestamp;
      temp.content = newComment.content;
      temp.referredUser = newComment.referredUser;
      temp.commentorid = newComment.commentorid;
      // console.log(temp);
      await commentService.createComment(temp);
    }
    await addComment();
    firstRendering.current = true;
    setCheck(!checknew);
    setValue('');
  };

  const handleEditComment = async (event) => {
    event.preventDefault();
    const commentId = (event.currentTarget.getAttribute('data-index'));
    const comm = await commentService.getCommentByCommentId(commentId);
    // console.log(comm);
    setEditComment(comm);
    setupdateValue(comm.content);
    forceUpdate();
  };
  const handleDeleteComment = async (event) => {
    const commentId = (event.currentTarget.getAttribute('data-index'));
    // setdeletePostId(postId);
    // console.log(postId);
    // console.log(deletePostId);
    await commentService.deleteComment(commentId);
    firstRendering.current = true;
    forceUpdate();
  };
  const handlefinish = async (event) => {
    async function putData() {
      const temp = new Comments();
      temp.postId = parseInt(pid, 10);
      temp.timestamp = editComment.timestamp;
      temp.content = editComment.content;
      temp.referredUser = editComment.referredUser;
      temp.commentorid = editComment.commentorid;
      temp.id = editComment.id;
      // console.log(temp);
      await commentService.updateComment(temp);
    }
    if (event.key === 'Enter') {
      await putData();
      firstRendering.current = true;
      setCheck(!checknew);
      setupdateValue('');
      const temp = new Comments();
      setEditComment(temp);
    }
  };
  function rendercomment(comm) {
    let ret;
    if (comm.id !== editComment.id) {
      ret = (
        <ListItemText
          primary={username}
          secondary={(
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              <JsxParser jsx={comm.content} />
            </Typography>
          )}
        />
      );
    } else {
      // setupdateValue(comm.content);
      ret = (
        <MentionsInput
          singleLine
          style={commentboxstyle}
          value={updatecontent}
          onChange={handleUpdate}
          onKeyPress={handlefinish}
        >
          <Mention
            style={{ backgroundColor: '#cee4e5' }}
            trigger="@"
            data={taggingUsers}
            markup="@[__display__]"
          />
        </MentionsInput>
      );
    }
    return ret;
  }
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      background: 'rgba(90, 90, 90, 0.8)',
      zIndex: 99
    }}
    >
      <div style={{
        zIndex: 99,
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        alignItems: 'center',
        background: 'white',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        height: 'max-content'
      }}
      >
        <Container maxWidth="xs">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MentionsInput
              singleLine
              style={commentboxstyle}
              value={content}
              onChange={handleChange}
            >
              <Mention
                style={{ backgroundColor: '#cee4e5' }}
                trigger="@"
                data={taggingUsers}
                markup="@[__display__]"
              />
            </MentionsInput>
            <Button type="button" onClick={handleAddComment}>Add</Button>
            <ClearIcon onClick={handleClear} />
          </Box>
          <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
            {commentList.map((comm) => (
              <ListItem key={comm.id}>
                <ListItemAvatar>
                  <Avatar key={comm.id} alt={comm.commentorid} src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                {rendercomment(comm)}
                <ListItemButton
                  sx={{ float: 'right' }}
                  data-index={comm.id}
                  onClick={handleEditComment}
                >
                  <EditIcon />
                </ListItemButton>
                <ListItemButton
                  aria-label="delete"
                  onClick={handleDeleteComment}
                  data-index={comm.id}
                >
                  <DeleteIcon />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    </div>
  );
}

Comment.propTypes = {
  uid: PropTypes.number,
  pid: PropTypes.string,
  handleCommentState: PropTypes.func
};

Comment.defaultProps = {
  uid: null,
  pid: null,
  handleCommentState: null
};

export default Comment;
