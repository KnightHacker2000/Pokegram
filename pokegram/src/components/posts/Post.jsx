import PropTypes from 'prop-types';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import postsService from '../../services/postsService';
// import pokemon from '../../images/pikachu.jpg';
import HomeState from '../../models/homeState';
import Edit from '../update_post/update_post';

const theme = createTheme();

function Posts(props) {
  const { homeStates } = props;
  const [postList, setPostList] = useState([]);
  const [renderEdit, setrenderEdit] = useState(false);
  const [, updateState] = React.useState();
  const [editPostId, setEditPostId] = useState(-1);
  const firstRendering = useRef(true);
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    // const params = '{"userId": 1}';
    async function fetchData() {
      const data = await postsService.getAllPosts();
      setPostList(data);
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      fetchData();
      // putData();
    }
  });

  function rendermedia(post) {
    let ret;
    if (post.type === 'video') {
      ret = (<CardMedia component="video" height={200} width={400} src={post.content_url} alt="post video" autoPlay controls />);
    } else {
      ret = (<CardMedia component="img" height={200} width={400} src={post.content_url} alt="post image" />);
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

  const handleAvatarClick = (event) => {
    // homeStates.handleHomeStates(false, false, false, false, true, homeStates.UID);
    event.preventDefault();
    const otherUID = event.currentTarget.getAttribute('data-index');
    homeStates.handleHomeStates(false, true, false, false, false, otherUID);
  };
  return (
    <ThemeProvider theme={theme}>
      {renderEdit && <Edit pid={editPostId} handleEditState={handleEdit} />}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {postList.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={handleCardClick}
                data-index={post.id}
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
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
Posts.propTypes = {
  homeStates: PropTypes.instanceOf(HomeState)
};

Posts.defaultProps = {
  homeStates: null
};
export default Posts;
