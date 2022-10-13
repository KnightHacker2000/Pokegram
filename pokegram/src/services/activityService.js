import PokemonClient from '../client';
import API from '../endpoints';
import Activity from '../models/activity';

class ActivityService {
  constructor() {
    this.client = new PokemonClient();
  }

  /**
   * activity API endpoint
   * @param userId: activity target user id
  */
  async getActivityByTarget(userId) {
    // TODO: replace test endpoint
    // const response = await this.client.get(API.ACT_TEST, userId);
    const response = await this.client.get(`${API.ACT_TEST}/${userId.userId}`);
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
  }
}

export default ActivityService;
