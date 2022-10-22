import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import {
  Button, Box, Container, FormControl, InputLabel, MenuItem, TextField
} from '@mui/material';
import Select from '@mui/material/Select';
import Posts from '../../models/post';
import postsService from '../../services/postsService';
import HomeState from '../../models/homeState';

// const theme = createTheme();
function Upload(props) {
  // console.log(props.homeStates);
  const { homeStates } = props;
  const [type, setType] = useState('photo');
  const [source, setSource] = useState();
  const [newpost, setPost] = useState({
    id: 5,
    username: 'Abby',
    timestamp: new Date(),
    type: 'photo',
    content_url: '',
    numLike: 0,
    description: '',
    commentRefs: [],
    users: []
  });
  const inputRef = useRef();
  // <track src="" kind="captions" srcLang="en" label="english_captions" />
  const handleChange = (event) => {
    setType(event.target.value);
    // const updatepost = {
    //   id: newpost.id,
    //   username: newpost.username,
    //   timestamp: newpost.timestamp,
    //   type: event.target.value,
    //   content_url: newpost.content_url,
    //   numLike: 0,
    //   description: newpost.description,
    //   commentRefs: newpost.commentRefs,
    //   users: newpost.users
    // };
    // setPost(updatepost);
    setPost((prevState) => ({
      ...prevState,
      type: event.target.value
    }));
    setSource();
  };

  function uploadVideo() {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setSource(url);
      // const updatepost = {
      //   id: newpost.id,
      //   username: newpost.username,
      //   timestamp: newpost.timestamp,
      //   type: newpost.type,
      //   content_url: url,
      //   numLike: 0,
      //   description: newpost.description,
      //   commentRefs: newpost.commentRefs,
      //   users: newpost.users
      // };
      // setPost(updatepost);
      setPost((prevState) => ({
        ...prevState,
        content_url: url
      }));
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
        {!source && <button type="button" onClick={handleChoose}>Choose</button>}
        {source && (
          <video
            className="VideoInput_video"
            width={300}
            height={300}
            controls
            src={source}
          >
            <track default kind="captions" srcLang="en" src="" />
          </video>
        )}
        <div className="VideoInput_footer">{source || 'Nothing selected'}</div>
      </div>
    );
  }
  function uploadPhoto() {
    // const { width, height } = props;
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setSource(url);
      // const updatepost = {
      //   id: newpost.id,
      //   username: newpost.username,
      //   timestamp: newpost.timestamp,
      //   type: newpost.type,
      //   content_url: url,
      //   numLike: 0,
      //   description: newpost.description,
      //   commentRefs: newpost.commentRefs,
      //   users: newpost.users
      // };
      // setPost(updatepost);
      setPost((prevState) => ({
        ...prevState,
        content_url: url
      }));
    };
    const handleChoose = () => {
      inputRef.current.click();
    };
    return (
      <div className="PhotoInput">
        <input
          ref={inputRef}
          className="PhotoInput_input"
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
        {!source && <button type="button" onClick={handleChoose}>Choose</button>}
        {source && (
          <img
            className="PhotoInput_video"
            alt=""
            width={300}
            height={300}
            src={source}
          />
        )}
        <div className="PhotoInput_footer">{source || 'Nothing selected'}</div>
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
    // console.log('entered create post');
    // console.log(newpost);
    async function putData() {
      const temp = new Posts();
      temp.username = newpost.username;
      temp.timestamp = newpost.timestamp;
      temp.type = newpost.type;
      temp.content_url = newpost.content_url;
      temp.numLike = newpost.numLike;
      temp.description = newpost.description;
      temp.commentRefs = newpost.commentRefs;
      temp.users = newpost.users;
      temp.timestamp = temp.timestamp.toString();
      await postsService.createPost(temp);
    }
    putData();
    homeStates.handleHomeStates(false, false, false, false, true, homeStates.UID);
  };

  const handleContent = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    // const updatepost = {
    //   id: newpost.id,
    //   username: newpost.username,
    //   timestamp: newpost.timestamp,
    //   type: newpost.type,
    //   content_url: newpost.content_url,
    //   numLike: 0,
    //   description: event.target.value,
    //   commentRefs: newpost.commentRefs,
    //   users: newpost.users
    // };
    // setPost(updatepost);
    setPost((prevState) => ({
      ...prevState,
      description: event.target.value
    }));
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
Upload.propTypes = {
  homeStates: PropTypes.instanceOf(HomeState)
};

Upload.defaultProps = {
  homeStates: null
};
export default Upload;
