import PropTypes from 'prop-types';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Box, Container
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import postsService from '../../services/postsService';

function TagPhoto(props) {
  const { pid, handleTagState } = props;
  const [userList, setUserList] = useState([1]);

  const firstRendering = useRef(true);
  useEffect(() => {
    async function fetchUserListbyPostId(postid) {
      const params = `{"postId":${postid} }`;
      const data = await postsService.getPostsById(JSON.parse(params));
      setUserList(data.users);
    }
    if (firstRendering.current) {
      firstRendering.current = false;
      fetchUserListbyPostId(pid);
    }
  });

  const handleClear = (event) => {
    event.preventDefault();
    handleTagState();
  };

  const renderUserList = () => {
    let ret;
    if (userList.length !== 0) {
      ret = userList.map((id) => (
        <ListItem key={(id)}>
          <ListItemAvatar>
            <Avatar alt={String(id)} src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={id}
          />
        </ListItem>
      ));
    } else {
      ret = <p>NO Tagging</p>;
    }

    return ret;
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
        <Container maxWidth="xs">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ClearIcon sx={{ width: '200%' }} onClick={handleClear} />
          </Box>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            { renderUserList(userList) }
          </List>
        </Container>
      </div>
    </div>
  );
}

TagPhoto.propTypes = {
  pid: PropTypes.string,
  handleTagState: PropTypes.func
};

TagPhoto.defaultProps = {
  pid: null,
  handleTagState: null
};

export default TagPhoto;
