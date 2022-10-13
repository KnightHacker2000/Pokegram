/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/media-has-caption */

// import Button from '@mui/material/Button';
import React from 'react';
import {
  Box, Container, FormControl, InputLabel, MenuItem
} from '@mui/material';
import Select from '@mui/material/Select';

// const theme = createTheme();
function Upload() {
  const [type, setType] = React.useState('');
  const [source, setSource] = React.useState();
  const inputRef = React.useRef();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  function uploadVideo(props) {
    const { width, height } = props;
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
          accept=".mov,.mp4"
        />
        {!source && <button onClick={handleChoose}>Choose</button>}
        {source && (
          <video
            className="VideoInput_video"
            width="100%"
            height={height}
            controls
            src={source}
          />
        )}
        <div className="VideoInput_footer">{source || 'Nothing selectd'}</div>
      </div>
    );
  }
  function uploadPhoto(props) {
    const { width, height } = props;
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
            width="100%"
            height={height}
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
      ret = uploadVideo({ width: 400, height: 300 });
    } else {
      ret = uploadPhoto({ width: 400, height: 300 });
    }
    // const ret = uploadVideo({ width: 400, height: 300 });
    return ret;
  }
  return (
    <Container maxWidth="xs">
      <Box sx={{
        mx: 2, p: 1, alignItems: 'center', display: 'flex'
      }}
      >
        <FormControl sx={{ marginTop: 10, width: '25ch' }}>
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
    </Container>
  );
}
export default Upload;
