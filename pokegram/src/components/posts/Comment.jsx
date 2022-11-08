import PropTypes from 'prop-types';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Button, Box, Container, TextField
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
// import Typography from '@mui/material/Typography';
import commentService from '../../services/commentService';
import Comments from '../../models/comment';

function Comment(props) {
  const { pid, handleCommentState } = props;
  const [commentList, setCommentList] = useState([]);
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
  const firstRendering = useRef(true);
  useEffect(() => {
    async function fetchCommentbyPostId(postid) {
      const data = await commentService.getCommentBypostId(parseInt(postid, 10));
      setCommentList(data);
    }
    if (firstRendering.current) {
      firstRendering.current = false;
      fetchCommentbyPostId(pid);
    }
  });

  const handleClear = (event) => {
    event.preventDefault();
    handleCommentState();
  };

  const handleChange = (event) => {
    setComment((prevState) => ({
      ...prevState,
      content: event.target.value
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
  };

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
            <TextField id="comment" label="Add a Comment" variant="standard" onChange={handleChange} />
            <Button type="button" onClick={handleAddComment}>Add</Button>
            <ClearIcon onClick={handleClear} />
          </Box>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {commentList.map((comm) => (
              <ListItem key={comm.id}>
                <ListItemAvatar>
                  <Avatar alt={comm.commentorid} src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={comm.content}
                />
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    </div>
  );
}

Comment.propTypes = {
  pid: PropTypes.string,
  handleCommentState: PropTypes.func
};

Comment.defaultProps = {
  pid: null,
  handleCommentState: null
};

export default Comment;
