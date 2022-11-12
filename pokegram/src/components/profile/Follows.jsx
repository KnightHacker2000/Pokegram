import PropTypes from 'prop-types';
import * as React from 'react';
import {
  useEffect, useRef, useState
} from 'react';
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
import userService from '../../services/userService';
import HomeState from '../../models/homeState';

function Follows(props) {
  const {
    showSug, UID, handleShowFo, homeStates
  } = props;
  console.log(UID);
  const [, setFoList] = useState(false);
  const [sugObj, setSugObj] = useState({ id: [1], usernames: [2], foList: [3] });

  const firstRendering = useRef(true);
  useEffect(() => {
    async function fetchFoSugbyUID(id) {
      let params = `{"userId":${id} }`;
      const foList = await userService.getUserById(JSON.parse(params));
      params = `{"id":${id} }`;
      const arr = [];
      await userService.getFoSug(JSON.parse(params)).then((data) => {
        data.users.forEach(async (user) => {
          params = `{"userId":${user} }`;
          const tmp = await userService.getUserById(JSON.parse(params));
          arr.push(tmp.username);
        });
        setSugObj({ id: data.users, usernames: arr, foList: foList.follows });
      });
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      // hardcoded UID, use UID prop in the fut
      fetchFoSugbyUID(2);
      setFoList(true);
    }
  });

  const handleClear = () => {
    handleShowFo();
  };

  const handleClick = (event) => {
    event.preventDefault();
    const otherUID = event.currentTarget.getAttribute('data-index');
    homeStates.handleHomeStates(false, true, false, false, false, otherUID);
    handleClear();
  };

  const foSug = (s) => {
    const prompt = <p>Follower Suggestions For You:</p>;
    let listing;
    if (s.id.length === 0) {
      listing = <p>No Suggestions</p>;
    } else {
      listing = s.id.map((ele, i) => (
        <ListItem key={Math.random()}>
          <ListItemAvatar key={Math.random()} onClick={handleClick} data-index={ele}>
            <Avatar alt={s.usernames[i]} src="/static/images/avatar/3.jpg" />
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

  const foList = () => {
    const prompt = <p>Following: </p>;
    const listing = sugObj.foList.map((ele) => (
      <ListItem key={ele}>
        <ListItemAvatar>
          <Avatar alt={ele.toString()} src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={ele}
        />
      </ListItem>
    ));
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
            {showSug && sugObj.foList.length > 0 && foSug(sugObj)}
            <Divider />
            {foList()}
          </List>
        </Container>
      </div>
    </div>
  );
}

Follows.propTypes = {
  showSug: PropTypes.bool,
  UID: PropTypes.number,
  handleShowFo: PropTypes.func,
  homeStates: PropTypes.instanceOf(HomeState)
};

Follows.defaultProps = {
  showSug: false,
  UID: -1,
  handleShowFo: null,
  homeStates: null
};

export default Follows;
