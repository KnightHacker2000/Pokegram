import PokemonClient from '../client';
import API from '../endpoints';
import Activity from '../models/activity';

const client = new PokemonClient();

/**
 * activity API endpoint
 * @param userId: activity target user id
*/
const getActivityByTarget = async (userId) => {
  // TODO: replace test endpoint
  // const response = await this.client.get(API.ACT_TEST, userId);
  const response = await client.get(`${API.ACT_TEST}/${userId.userId}`);
  // let ActArr = [];
  const activities = response.activity;
  const ActArr = activities.map((act) => {
    const newAct = new Activity(
      act.id,
      act.initiatorId,
      act.targetId,
      act.activityType,
      new Date(act.timestamp)
    );
    return newAct;
  });
  return ActArr;
};

/**
 * new activity API endpoint
*/
const createActivity = async (body) => {
  // TODO: replace test endpoint
  // const response = await this.client.post(API.ACT, body);
  const response = await client.post(`${API.ACT_TEST}`, body);
  return response;
};

export default { getActivityByTarget, createActivity };
