/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  useState, useEffect, useRef
} from 'react';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import HideSourceIcon from '@mui/icons-material/HideSource';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import loading from '../../images/loading2.gif';
import postsService from '../../services/postsService';
import userService from '../../services/userService';
// import pokemon from '../../images/pikachu.jpg';
import Comment from './Comment';
import TagPhoto from './Tag';
import HomeState from '../../models/homeState';
import Edit from '../update_post/update_post';

const theme = createTheme();
const MySwal = withReactContent(Swal);

function Posts(props) {
  const { homeStates, ischange } = props;
  // console.log(homeStates);
  // console.log(homeStates.myUID);
  // console.log(homeStates.UID);
  const [postList, setPostList] = useState([]);
  const [currPosts, setcurrPosts] = useState([]);
  const [currRange, setcurrRange] = useState([-1, -1]);
  const [numposts, setNumposts] = useState(0);
  const [renderEdit, setrenderEdit] = useState(false);
  const [renderComment, setrenderComment] = useState(false);
  const [renderTagging, setrenderTagging] = useState(false);
  // const [isLike, setLike] = useState(false);
  const [likePosts, setlikePosts] = useState([]);
  const [, updateState] = React.useState();
  const [editPostId, setEditPostId] = useState(-1);
  const [commentPostId, setcommentPostId] = useState(-1);
  const [tagPostId, settagPostId] = useState(-1);
  // const [deletePostId, setdeletePostId] = useState(-1);
  const firstRendering = useRef(true);
  const loader = useRef(null);
  const canEdit = homeStates.UID === homeStates.myUID;
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    // console.log(currPosts);
    const handleObserver = async (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio > 0.9) {
          // console.log('here');
          if ((postList.length) > 0) {
            if (currRange[0] === -1 && currRange[1] === -1) {
              const tmpList = currRange;
              tmpList[0] = 0;
              tmpList[1] = postList.length >= 6 ? 5 : postList.length - 1;
              setcurrRange(tmpList);
              setcurrPosts(postList.slice(tmpList[0], tmpList[1] + 1));
            } else {
              if (currRange[1] === postList.length - 1) {
                break;
              }
              const tmpList = currRange;
              tmpList[1] = tmpList[1] + 7 > postList.length ? postList.length - 1 : tmpList[1] + 6;
              setcurrRange(tmpList);
              setcurrPosts(postList.slice(tmpList[0], tmpList[1] + 1));
            }
          }
          break;
        }
      }
    };
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    async function fetchallpostsData() {
      const data = await postsService.getAllPosts();
      // console.log(data);
      if (data.length === 0) {
        setcurrRange([-1, -1]);
        setcurrPosts([]);
      }
      setPostList(data);
    }

    async function fetchpostsbyusername(userName) {
      const data = await postsService.getPostsByUserName(userName);
      if (data.length === 0) {
        setcurrRange([-1, -1]);
        setcurrPosts([]);
      }
      setPostList(data);
    }

    async function getUser() {
      const userparams = { userId: homeStates.myUID };
      const user = await userService.getUserById((userparams));
      setlikePosts(user.likedPosts);
      setNumposts(user.numPosts);
    }

    async function polling() {
      firstRendering.current = false;
      if (homeStates.UID === -1) {
        await fetchallpostsData();
      } else {
        try {
          await fetchpostsbyusername(homeStates.UID);
        } catch (err) {
          MySwal.fire('Unexpected error, please try again!');
        }
      }
      await getUser();
      setTimeout(polling, 5000);
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      if (homeStates.UID === -1) {
        fetchallpostsData();
      } else {
        fetchpostsbyusername(homeStates.UID);
      }
      getUser();
      setTimeout(polling, 5000);
      // useInterval(fetchallpostsData, 5000);
      // putData();
    }

    // let timesRun = 0;
    // const interval = setInterval(() => {
    //   timesRun += 1;
    //   if (timesRun === 60) {
    //     clearInterval(interval);
    //   }
    //   console.log(timesRun);
    //   try {
    //     fetchallpostsData();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // firstRendering.current = false;
    // if (homeStates.UID === -1) {
    //   fetchallpostsData();
    // } else {
    //   try {
    //     fetchpostsbyusername(homeStates.UID);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // getUser();
    // }, 5000);
  });

  function rendermedia(post) {
    let ret;
    if (post.type === 'video') {
      ret = (
        <CardMedia className="media" component="video" height={200} width={400} src={post.content_url} alt="post video" autoPlay controls />
      );
    } else {
      ret = (
        <CardMedia className="media" component="img" height={200} width={400} src={post.content_url} alt="post image" />
      );
    }
    return ret;
  }

  const handleCardClick = (event) => {
    event.preventDefault();
    setEditPostId(event.currentTarget.getAttribute('data-index'));
    setrenderEdit(true);
    forceUpdate();
  };

  const handleEdit = () => {
    setrenderEdit(false);
    firstRendering.current = true;
    forceUpdate();
  };

  const handleAddCommentClick = (event) => {
    event.preventDefault();
    setcommentPostId(event.currentTarget.getAttribute('data-index'));
    setrenderComment(true);
    forceUpdate();
  };

  // const handleLikeClick = (event) => {
  // event.preventDefault();
  // setlikePostId(event.currentTarget.getAttribute('data-index'));
  // setrenderLike(true);
  // forceUpdate();
  // };

  const handlePhotoTagClick = (event) => {
    event.preventDefault();
    settagPostId(event.currentTarget.getAttribute('data-index'));
    setrenderTagging(true);
    forceUpdate();
  };

  const handleComment = () => {
    setrenderComment(false);
    firstRendering.current = true;
    forceUpdate();
  };

  const handleTagPost = () => {
    setrenderTagging(false);
    firstRendering.current = true;
    forceUpdate();
  };

  const handleLikePost = async (event) => {
    // console.log(event.currentTarget.getAttribute('data-index'));
    // console.log(isLike);
    const postId = event.currentTarget.getAttribute('data-index');
    // const numpostId = parseInt(postId, 10);
    // const params = `{"postId":${postId} }`;
    const userparams = { userId: homeStates.myUID };
    const user = await userService.getUserById(userparams);
    const post = await postsService.getPostsById(postId);
    await userService.addlike(user, postId, post.username);
    const updatefileds = { numLike: post.numLike + 1 };
    await postsService.updatePost(postId, JSON.stringify(updatefileds));
    likePosts.push(postId);
    setlikePosts(likePosts);
    firstRendering.current = true;
    forceUpdate();
  };
  const handleUnLikePost = async (event) => {
    const postId = event.currentTarget.getAttribute('data-index');
    // const numpostId = parseInt(postId, 10);
    // const params = `{"postId":${postId} }`;
    const userparams = { userId: homeStates.myUID };
    const user = await userService.getUserById((userparams));
    const post = await postsService.getPostsById(postId);
    const pIndex = likePosts.indexOf(postId);
    likePosts.splice(pIndex, 1);
    await userService.removeLike(user, postId);
    const updatefileds = { numLike: post.numLike - 1 };
    await postsService.updatePost(postId, JSON.stringify(updatefileds));
    setlikePosts(likePosts);
    firstRendering.current = true;
    forceUpdate();
  };

  const handleDeletePost = async (event) => {
    // console.log(event.currentTarget.getAttribute('data-index'));
    const postId = (event.currentTarget.getAttribute('data-index'));
    // setdeletePostId(postId);
    // console.log(postId);
    // console.log(deletePostId);
    await postsService.deletePost(postId);
    const updatefileds = { numPosts: numposts - 1 };
    await userService.updateUser(homeStates.myUID, updatefileds);
    ischange();
    firstRendering.current = true;
    forceUpdate();
  };

  const handleAvatarClick = (event) => {
    // homeStates.handleHomeStates(false, false, false, false, true, homeStates.UID);
    event.preventDefault();
    const otherUID = event.currentTarget.getAttribute('data-index');
    homeStates.handleHomeStates(false, true, false, false, false, otherUID);
  };

  function likebuton(postId) {
    let ret;
    if (likePosts && likePosts.includes(postId)) {
      ret = (
        <IconButton
          sx={{ color: 'red' }}
          aria-label="add to favorites"
          onClick={handleUnLikePost}
          data-index={postId}
        >
          <FavoriteIcon />
        </IconButton>
      );
    } else {
      ret = (
        <IconButton
          aria-label="add to favorites"
          onClick={handleLikePost}
          data-index={postId}
        >
          <FavoriteIcon />
        </IconButton>
      );
    }
    return ret;
  }

  const handleHideClick = async (event) => {
    // homeStates.handleHomeStates(false, false, false, false, true, homeStates.UID);
    event.preventDefault();
    const postid = event.currentTarget.getAttribute('data-index');
    const post = await postsService.getPostsById(postid);
    const updatehide = !post.hide;
    const updatefileds = { hide: updatehide };
    await postsService.updatePost(postid, JSON.stringify(updatefileds));
    firstRendering.current = true;
    forceUpdate();
  };

  function clickbutton(hideflag, postId) {
    // console.log(hideflag);
    let ret;
    if (hideflag === false) {
      ret = (
        <IconButton
          aria-label="click to hide"
          onClick={handleHideClick}
          data-index={postId}
        >
          <HideSourceIcon />
        </IconButton>
      );
    } else {
      ret = (
        <IconButton
          sx={{ color: 'red' }}
          aria-label="click to hide"
          onClick={handleHideClick}
          data-index={postId}
        >
          <HideSourceIcon />
        </IconButton>
      );
    }
    return ret;
  }

  return (
    <ThemeProvider theme={theme}>
      {renderEdit && <Edit pid={editPostId} handleEditState={handleEdit} />}
      {renderComment && <Comment uid={homeStates.myUID} pid={commentPostId} handleCommentState={handleComment} />}
      {renderTagging && <TagPhoto pid={tagPostId} handleTagState={handleTagPost} />}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {currPosts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardHeader
                  avatar={<Avatar alt="pikachu" sx={{ m: 1 }} src="http://img4.wikia.nocookie.net/__cb20140328190757/pokemon/images/thumb/2/21/001Bulbasaur.png/200px-001Bulbasaur.png" onClick={handleAvatarClick} data-index={post.username} />}
                  action={
                    <IconButton aria-label="settings" />
                  }
                  title={post.username}
                  subheader={post.timestamp.toString()}
                />
                {rendermedia(post)}
                <CardContent>
                  <Typography variant="body2" color="text.secondary" maxWidth="20vw">
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {likebuton(post.id)}
                  { canEdit && (
                    <IconButton
                      aria-label="edit"
                      onClick={handleCardClick}
                      data-index={post.id}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="comment"
                    onClick={handleAddCommentClick}
                    data-index={post.id}
                    data-testid="test_addComm"
                  >
                    <AddCommentIcon />
                  </IconButton>
                  <IconButton
                    aria-label="tagging"
                    onClick={handlePhotoTagClick}
                    data-index={post.id}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  { canEdit && (
                    <IconButton
                      aria-label="delete"
                      onClick={handleDeletePost}
                      data-index={post.id}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  { post.username === homeStates.myUID && clickbutton(post.hide, post.id)}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div style={{
        // position: 'fixed',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        marginTop: '-px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'transparent',
        zIndex: 99
      }}
      >
        <img src={loading} ref={loader} alt="loading..." style={{ width: '200px', height: '150px' }} />
      </div>
    </ThemeProvider>
  );
}
Posts.propTypes = {
  homeStates: PropTypes.instanceOf(HomeState),
  ischange: PropTypes.func

};

Posts.defaultProps = {
  homeStates: null,
  ischange: null
};
export default Posts;
