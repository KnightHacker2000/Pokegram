import PropTypes from 'prop-types';
import * as React from 'react';
import {
  Box, Container
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import HomeState from '../../models/homeState';

function Follows(props) {
  const {
    showSug, handleShowFo, foSug, homeStates, foList
  } = props;

  const handleClear = () => {
    handleShowFo();
  };

  const handleClick = (event) => {
    event.preventDefault();
    const otherUID = event.currentTarget.getAttribute('data-index');
    homeStates.handleHomeStates(false, true, false, false, false, otherUID);
    handleClear();
  };

  const renderFoSug = () => {
    const prompt = <p>Follower Suggestions For You:</p>;
    let listing;
    if (foSug.length === 0) {
      listing = <p>No Suggestions</p>;
    } else {
      listing = foSug.map((ele) => (
        <ListItem key={Math.random()}>
          <ListItemAvatar key={Math.random()} onClick={handleClick} data-index={ele}>
            <Avatar alt={ele} src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={ele}
          />
        </ListItem>
      ));
    }
    return (
      <div>
        {prompt}
        {listing}
      </div>
    );
  };

  const getfoList = () => {
    const prompt = <p>Following: </p>;
    let listing;
    if (foList.length === 0) {
      listing = <p>Follow Somebody!</p>;
    } else {
      listing = foList.map((ele) => (
        <ListItem key={ele}>
          <ListItemAvatar>
            <Avatar alt={ele.toString()} src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={ele}
          />
        </ListItem>
      ));
    }
    return (
      <div>
        {prompt}
        {listing}
      </div>
    );
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
            {showSug && renderFoSug()}
            <Divider />
            {getfoList()}
          </List>
        </Container>
      </div>
    </div>
  );
}

Follows.propTypes = {
  showSug: PropTypes.bool,
  handleShowFo: PropTypes.func,
  homeStates: PropTypes.instanceOf(HomeState),
  foList: PropTypes.arrayOf(PropTypes.string),
  foSug: PropTypes.arrayOf(PropTypes.string)
};

Follows.defaultProps = {
  showSug: false,
  handleShowFo: null,
  homeStates: null,
  foList: null,
  foSug: null
};

export default Follows;
