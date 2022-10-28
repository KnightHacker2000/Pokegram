import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
// import {
//   Button, Box, Container, FormControl, InputLabel, MenuItem, TextField
// } from '@mui/material';

function UpdatePost(props) {
  const { pid, handleEditState } = props;
  console.log(pid);
  console.log(handleEditState);
  const handleReturn = () => {
    handleEditState();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(90, 90, 90, 0.5)',
      zIndex: 9999
    }}
    >
      <div style={{
        zIndex: 99,
        display: 'flex',
        position: 'fixed',
        top: '50%',
        bottom: '50%',
        left: '40%',
        right: '50%',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        height: '100px'
      }}
      >
        <Button type="button" onClick={handleReturn}>
          {pid}
        </Button>
        {/* <Container maxWidth="lg">
          <Box
            sx={{
              mx: 2, p: 1, alignItems: 'center'
            }}
            component="form"
            onSubmit={handleUpdatePost}
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
              <Button type="submit" alignitems="right"
              variant="contained" data-testid="test_createpost">Create</Button>
            </Box>
          </Box>
        </Container> */}
      </div>
    </div>
  );
}

UpdatePost.propTypes = {
  pid: PropTypes.number,
  handleEditState: PropTypes.func
};

UpdatePost.defaultProps = {
  pid: null,
  handleEditState: null
};

export default UpdatePost;
