import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import avatar from '../../images/pikachu.jpg';
// import Activity from '../../models/activity';
import ActivityService from '../../services/activityService';

const parseActText = (act) => {
  // const time = act.timestamp.toString();
  switch (act.activityType) {
    case 'Follow':
      return ' followed you!';
    case 'Unfollow':
      return ' unfollowed you!';
    case 'Like':
      return ' liked your post!';
    case 'Comment':
      return ' commented your post!';
    default:
  }
  return '';
};

function Act() {
  const [actList, setActList] = useState([]);
  const firstRendering = useRef(true);
  // console.log(props);

  useEffect(() => {
    const params = '{"userId": 1}';
    async function fetchData() {
      const data = await ActivityService.getActivityByTarget(JSON.parse(params));
      setActList(data);
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      fetchData();
      // putData();
    }
  });

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px'
    }}
    >
      <List key={5} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {actList.map((act) => (
          <ListItem key={act.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="http://img4.wikia.nocookie.net/__cb20140328190757/pokemon/images/thumb/2/21/001Bulbasaur.png/200px-001Bulbasaur.png" />
            </ListItemAvatar>
            <ListItemText
              primary={`New ${act.activityType} Activity!`}
              secondary={(
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {act.initiatorId}
                  </Typography>
                  { parseActText(act)}
                  <br />
                  { act.timestamp.toString() }
                </>
              )}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default { Act, parseActText };
