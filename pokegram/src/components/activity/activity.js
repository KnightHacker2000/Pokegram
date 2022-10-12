/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-indent */
import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Activity from '../../models/activity';
import avatar from '../../images/pikachu.jpg';

const theme = createTheme();

function Act(props) {
  // call to get user activity by id
  const testAct1 = new Activity(0, 'testUser1', 'charlie', 'Comment', new Date('December 16, 2021 03:24:00'));
  const testAct2 = new Activity(1, 'testUser2', 'charlie', 'Like', new Date('December 17, 2021 03:24:00'));
  const testAct3 = new Activity(2, 'testUser3', 'charlie', 'Follow', new Date('March 10, 2022 03:24:00'));
  const testAct4 = new Activity(3, 'testUser4', 'charlie', 'Unfollow', new Date('April 10, 2022 03:24:00'));

  // result of getActivity
  const actList = [testAct1, testAct2, testAct3, testAct4];

  // fetch user avatar
  const avaList = [avatar, avatar, avatar, avatar];

  const parseActText = (act) => {
    const time = act.timestamp.toString();
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
