/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/media-has-caption */

// import Button from '@mui/material/Button';
import React, { useEffect, useState, useRef } from 'react';
import {
  Button, Box, Container, FormControl, InputLabel, MenuItem, TextField
} from '@mui/material';
import Select from '@mui/material/Select';
import Posts from '../../models/post';
import postsService from '../../services/postsService';

// const theme = createTheme();
function Upload() {
  const [type, setType] = useState('photo');
  const [source, setSource] = useState();
  const inputRef = useRef();
  const post = {
    id: '',
    username: '',
    timestamp: '',
    content_url: '',
    numLike: 0,
    description: '',
    commentRefs: [],
    users: []
  };
  // console.log(source);
  useEffect(() => {
    async function putData() {
      const newPost = new Posts(4, 'Ann', new Date('October 16, 2022 11:30:00'), '../../images/pikachu.jpg', 5, 'A new post', [], []);
      newPost.timestamp = newPost.timestamp.toString();
      const res = await postsService.createPost(newPost);
      console.log(res);
    }
    console.log(source);
    if (source) {
      putData();
    }
  });

  const handleChange = (event) => {
    setType(event.target.value);
    setSource();
  };

  function uploadVideo() {
    // const { width, height } = props;
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      console.log(file);
      setSource(url);
    };
    const handleChoose = () => {
      inputRef.current.click();
    };
    return (
      <div className="VideoInput">
        <input
          ref={inputRef}
          className="VideoInput_input"
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {!source && <button onClick={handleChoose}>Choose</button>}
        {source && (
          <video
            className="VideoInput_video"
            width={300}
            height={300}
            controls
            src={source}
          />
        )}
        <div className="VideoInput_footer">{source || 'Nothing selectd'}</div>
      </div>
    );
  }
  function uploadPhoto() {
    // const { width, height } = props;
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setSource(url);
    };
    const handleChoose = () => {
      inputRef.current.click();
    };
    return (
      <div className="VideoInput">
        <input
          ref={inputRef}
          className="VideoInput_input"
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
        {!source && <button onClick={handleChoose}>Choose</button>}
        {source && (
          <img
            className="VideoInput_video"
            alt=""
            width={300}
            height={300}
            src={source}
          />
        )}
        <div className="VideoInput_footer">{source || 'Nothing selectd'}</div>
      </div>
    );
  }
  function updateURL() {
    let ret;
    if (type === 'video') {
      ret = uploadVideo();
    } else {
      ret = uploadPhoto();
    }
    // const ret = uploadVideo({ width: 400, height: 300 });
    return ret;
  }
  const handleCreatePost = (event) => {
    event.preventDefault();
    console.log('entered create post');
    console.log(post);
    post.description = 'changed!';
    console.log(post);
  };

  const handleContent = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mx: 2, p: 1, alignItems: 'center'
        }}
        component="form"
        onSubmit={handleCreatePost}
        noValidate
      >
        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ margintop: 10, width: '25ch' }}>
            <InputLabel id="demo-simple-select-label">Upload Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Upload Type"
              onChange={handleChange}
            >
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="photo">Photo</MenuItem>
            </Select>
          </FormControl>
          {updateURL()}
        </Box>
        <TextField
          margintop="20px"
          margin="normal"
          fullWidth
          multiline
          rowsmax={8}
          rows={8}
          id="post_content"
          label="Create your Post!"
          onChange={handleContent}
        />
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignitems="flex-end"
        >
          <Button type="submit" alignitems="right" variant="contained">Create</Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Upload;
