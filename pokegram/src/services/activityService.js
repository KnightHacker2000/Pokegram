/* eslint-disable no-underscore-dangle */
import PokemonClient from '../client';
import API from '../endpoints';
import Activity from '../models/activity';

const client = new PokemonClient();

/**
 * activity API endpoint
 * @param userId: activity target username
*/
const getActivityByTarget = async (userId) => {
  // TODO: replace test endpoint
  // const response = await this.client.get(API.ACT_TEST, userId);
  let ret;
  await client.get(`${API.ACT}/${userId.userId}`).then((response) => {
    const activities = response.data;
    ret = activities.map((act) => {
      const newAct = new Activity(
        act._id,
        act.initiatorId,
        act.targetId,
        act.activityType,
        new Date(act.timestamp)
      );
      // console.log(newAct);
      return newAct;
    });
  });
  // console.log(response);
  // let ActArr = [];
  // const activities = response.data;
  // console.log(activities);
  // console.log(ret);
  return ret;
};

/**
 * new activity API endpoint
*/
const createActivity = async (body) => {
  // TODO: replace test endpoint
  // const response = await this.client.post(API.ACT, body);
  const response = await client.post(`${API.ACT}`, JSON.parse(body));
  return response;
};

export default { getActivityByTarget, createActivity };
