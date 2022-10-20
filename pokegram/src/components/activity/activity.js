import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import avatar from '../../images/pikachu.jpg';
// import Activity from '../../models/activity';
import ActivityService from '../../services/activityService';

function Act(props) {
  const [actList, setActList] = useState([]);
  const firstRendering = useRef(true);
  console.log(props);

  useEffect(() => {
    const params = '{"userId": 1}';
    async function fetchData() {
      const data = await ActivityService.getActivityByTarget(JSON.parse(params));
      setActList(data);
    }

    // async function putData() {
    // const testAct1 = new Activity(10, 'testUser1', 'charlie',
    // 'Comment', new Date('December 16, 2021 03:24:00'));
    // testAct1.timestamp = testAct1.timestamp.toString();
    // console.log(testAct1);
    // const res = await ActivityService.createActivity(testAct1);
    // console.log(res);
    // }

    if (firstRendering.current) {
      firstRendering.current = false;
      fetchData();
      // putData();
    }
  });
  // call to get user activity by id
  // const testAct1 = new Activity(0, 'testUser1', 'charlie',
  // 'Comment', new Date('December 16, 2021 03:24:00'));
  // const testAct2 = new Activity(1, 'testUser2', 'charlie', 'Like',
  // new Date('December 17, 2021 03:24:00'));
  // const testAct3 = new Activity(2, 'testUser3', 'charlie', 'Follow',
  //  new Date('March 10, 2022 03:24:00'));
  // const testAct4 = new Activity(3, 'testUser4', 'charlie', 'Unfollow',
  // new Date('April 10, 2022 03:24:00'));

  // // result of getActivity
  // const actList = [testAct1, testAct2, testAct3, testAct4];

  // fetch user avatar
  const avaList = [avatar, avatar, avatar, avatar];

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

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px'
    }}
    >
      <List key={5} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {actList.map((act) => (
          <ListItem key={act.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={avaList[act.id]} />
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

export default Act;
