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
// import Typography from '@mui/material/Typography';
import commentService from '../../services/commentService';

function Comment() {
  const [commentList, setCommentList] = useState([]);
  // const [newComment, setComment] = useState({
  //   "id": 1,
  //   "postId": 1,
  //   "timestamp": "November 05, 2021 14:21:00",
  //   "content": "I love this post!",
  //   "referredUser": [
  //     1,
  //     2,
  //     3
  //   ],
  //   "userId": 7
  // });
  const firstRendering = useRef(true);
  useEffect(() => {
    async function fetchCommentbyPostId() {
      const data = await commentService.getCommentBypostId(1);
      console.log(data);
      setCommentList(data);
    }
    if (firstRendering.current) {
      firstRendering.current = false;
      fetchCommentbyPostId();
    }
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField id="comment" label="Add a Comment" variant="standard" />
        <Button type="button">Add</Button>
      </Box>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {commentList.map((comm) => (
          <ListItem key={comm.id}>
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={comm.content}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
export default Comment;
