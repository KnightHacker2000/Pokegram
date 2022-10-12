class Activity {
  id;

  initiatorId;

  targetId;

  activityType;

  timestamp;

  constructor(id, init, target, type, time) {
    this.id = id;
    this.initiatorId = init;
    this.targetId = target;
    this.activityType = type;
    this.timestamp = time;
  }
}

export default Activity;
