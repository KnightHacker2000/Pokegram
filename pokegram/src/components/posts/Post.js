/* eslint-disable import/no-dynamic-require */
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
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import postsService from '../../services/postsService';

const theme = createTheme();

function Posts(props) {
  console.log(props);
  const [postList, setPostList] = useState([]);
  const firstRendering = useRef(true);

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
  
  
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {postList.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardHeader
                  avatar={<Avatar />}
                  action={
                    <IconButton aria-label="settings" />
                  }
                  title={post.username}
                  subheader={post.timestamp.toString()}
                />
                <CardMedia
                  component="img"
                  height={200}
                  width={400}
                  src={post.content_url}
                  alt="post image"
                />
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
export default Posts;
