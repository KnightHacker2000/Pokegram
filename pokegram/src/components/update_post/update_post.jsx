import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import {
  Button, Box, Container, FormControl, InputLabel, MenuItem, TextField
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Select from '@mui/material/Select';
import Posts from '../../models/post';
import postsService from '../../services/postsService';

function UpdatePost(props) {
  const { pid, handleEditState } = props;
  const [post, setPost] = useState(new Posts());
  const [type, setType] = useState('photo');
  const [source, setSource] = useState();
  const firstRendering = useRef(true);
  const inputRef = useRef();

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await postsService.getPostsById(pid);
      setPost(data);
      setType(data.type);
      setSource(data.content_url);
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      console.log(pid);
      fetchData();
    }
  });

  const handleReturn = async (event) => {
    event.preventDefault();
    // console.log(post);
    async function putData() {
      /*
      const temp = new Posts();
      temp.id = post.id;
      temp.username = post.username;
      temp.timestamp = post.timestamp;
      temp.type = post.type;
      temp.content_url = post.content_url;
      temp.numLike = post.numLike;
      temp.description = post.description;
      temp.commentRefs = post.commentRefs;
      temp.users = post.users;
      // temp.timestamp = post.timestamp.toString(); // for testing only
      temp.timestamp = Date.now().toString();
      // console.log(temp);
      */
      const updatefileds = {
        username: post.username,
        timestamp: Date.now(),
        type: post.type,
        content_url: post.content_url,
        numLike: post.numLike,
        description: post.description,
        commentRefs: post.commentRefs,
        users: post.users
      };
      await postsService.updatePost(pid, JSON.stringify(updatefileds));
    }
    await putData();
    handleEditState();
  };

  function uploadVideo() {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setSource(url);
      const updatepost = {
        id: post.id,
        username: post.username,
        timestamp: post.timestamp,
        type: post.type,
        content_url: url,
        numLike: 0,
        description: post.description,
        commentRefs: post.commentRefs,
        users: post.users
      };
      setPost(updatepost);
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
      const updatepost = {
        id: post.id,
        username: post.username,
        timestamp: post.timestamp,
        type: post.type,
        content_url: url,
        numLike: post.numLike,
        description: post.description,
        commentRefs: post.commentRefs,
        users: post.users
      };
      setPost(updatepost);
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
  const handleContent = (event) => {
    event.preventDefault();
    const updatepost = {
      id: post.id,
      username: post.username,
      timestamp: post.timestamp,
      type: post.type,
      content_url: post.content_url,
      numLike: post.numLike,
      description: event.target.value,
      commentRefs: post.commentRefs,
      users: post.users
    };
    setPost(updatepost);
  };

  const handleChange = (event) => {
    setType(event.target.value);
    const updatepost = {
      id: post.id,
      username: post.username,
      timestamp: post.timestamp,
      type: event.target.value,
      content_url: post.content_url,
      numLike: post.numLike,
      description: post.description,
      commentRefs: post.commentRefs,
      users: post.users
    };
    setPost(updatepost);
    setSource();
  };

  const handleClear = (event) => {
    event.preventDefault();
    handleEditState();
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

        <Container maxWidth="lg">
          <ClearIcon sx={{ width: '200%' }} onClick={handleClear} />
          <Box
            sx={{
              mx: 0, p: 1, display: 'flex', alignItems: 'start', width: 'auto', flexDirection: 'column', paddingTop: '10px'
            }}
            component="form"
            onSubmit={handleReturn}
            noValidate
          >
            <Box sx={{ display: 'flex' }}>
              <FormControl sx={{ margintop: 10, width: '25ch' }}>
                <InputLabel id="demo-simple-select-label">Upload Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  data-testid="test_select"
                  value={type}
                  label="Change Upload Type"
                  onChange={handleChange}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="photo">Photo</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div>
              {updateURL()}
            </div>
            <div>
              <TextField
                margintop="20px"
                margin="normal"
                fullWidth
                multiline
                rowsmax={8}
                rows={8}
                id="post_content"
                label="Update your Post!"
                value={post.description || ''}
                onChange={handleContent}
              />
            </div>
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignitems="flex-end"
            >
              <Button
                type="submit"
                alignitems="right"
                variant="contained"
                data-testid="test_updatepost"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}

UpdatePost.propTypes = {
  pid: PropTypes.string,
  handleEditState: PropTypes.func
};

UpdatePost.defaultProps = {
  pid: null,
  handleEditState: null
};

export default UpdatePost;
