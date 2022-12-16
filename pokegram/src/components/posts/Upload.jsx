import PropTypes from 'prop-types';
// import AWS from 'aws-sdk';
import React, { useState, useRef, useEffect } from 'react';
import {
  Button, Box, Container, FormControl, InputLabel, MenuItem, TextField
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Posts from '../../models/post';
import postsService from '../../services/postsService';
import HomeState from '../../models/homeState';
import userService from '../../services/userService';

// const theme = createTheme();
function Upload(props) {
  const { homeStates } = props; // homeStates.myUID is my current username
  // console.log(homeStates);
  const [type, setType] = useState('photo');
  const [source, setSource] = useState();
  const [foList, setFoList] = useState([]);
  const [numposts, setNumposts] = useState(0);
  const [taggedUsers, settaggedUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newpost, setPost] = useState({
    id: 5,
    username: 'Abby',
    timestamp: new Date(),
    type: 'photo',
    content_url: '',
    numLike: 0,
    description: '',
    commentRefs: [],
    users: [],
    hide: false
  });
  const inputRef = useRef();
  const firstRendering = useRef(true);
  // <track src="" kind="captions" srcLang="en" label="english_captions" />
  // const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    async function fetchFollows(id) {
      const userparams = { userId: id };
      const user = await userService.getUserById((userparams));
      setFoList(user.follows);
      setNumposts(user.numPosts);
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      // hardcoded UID, use UID prop in the future
      fetchFollows(homeStates.myUID);
    }
  });

  const handleChange = (event) => {
    setType(event.target.value);
    setPost((prevState) => ({
      ...prevState,
      type: event.target.value
    }));
    setSource();
  };
  /*
  const uploadFile = (file) => {
    // console.log('entered uploadfile');
    // console.log(file);
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
    // const url = myBucket.getSignedUrl('getObject', { Key: params.Key });
    // console.log('try to fetch url');
    // console.log(url);
    const url = `https://557pokemonstorage.s3.amazonaws.com/${file.name}`;
    return url;
  };
  */

  function uploadVideo() {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setSource(url);
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
      setSelectedFile(file);
      // forceUpdate();
      const url = URL.createObjectURL(file);
      setSource(url);
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
          name="uploads3_photo"
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
  const handleCreatePost = async (event) => {
    event.preventDefault();
    // console.log('entered create post');
    async function putData() {
      const ts3url = `https://557pokemonstorage.s3.amazonaws.com/${selectedFile.name}`;
      await postsService.uploadtoS3(selectedFile);
      const temp = new Posts();
      temp.username = homeStates.myUID;
      temp.timestamp = newpost.timestamp;
      temp.type = newpost.type;
      temp.content_url = newpost.content_url;
      temp.numLike = newpost.numLike;
      temp.description = newpost.description;
      temp.commentRefs = newpost.commentRefs;
      temp.users = newpost.users;
      temp.timestamp = temp.timestamp.toString();
      temp.hide = false;
      await postsService.createPost(JSON.stringify({
        username: homeStates.myUID,
        timestamp: newpost.timestamp.toString(),
        type: newpost.type,
        content_url: ts3url,
        numLike: 0,
        description: newpost.description,
        commentRefs: newpost.commentRefs,
        users: newpost.users,
        hide: false
      }));
      const updatefileds = { numPosts: numposts + 1 };
      await userService.updateUser(homeStates.myUID, updatefileds);
    }
    await putData();
    // frontendUploads3();
    setTimeout(() => {
      homeStates.handleHomeStates(false, false, false, false, true, -1);
    }, 5000);
  };

  const handleContent = (event) => {
    event.preventDefault();
    setPost((prevState) => ({
      ...prevState,
      description: event.target.value
    }));
  };

  const handleTag = (event) => {
    const {
      target: { value }
    } = event;
    settaggedUsers(
      typeof value === 'string' ? value.split(',') : value
    );
    setPost((prevState) => ({
      ...prevState,
      users: typeof value === 'string' ? value.split(',') : value
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
        <FormControl sx={{ margintop: 10, width: '25ch' }}>
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={taggedUsers}
            onChange={handleTag}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {foList.map((user) => (
              <MenuItem
                key={user}
                value={user}
              >
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignitems="flex-end"
        >
          <Button type="submit" alignitems="right" variant="contained" data-testid="test_createpost">Create</Button>
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
