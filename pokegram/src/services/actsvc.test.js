import { expect, test } from '@jest/globals';
import activityService from './activityService';
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mockAxios = new MockAdapter(axios);

describe("get Act List Test", () => {
  mockAxios.onGet().reply(200, { activity: [{
    id: 1,
    initiatorId: 2,
    targetId: 2,
    activityType: 'comment',
    timestamp: '2022-01-01'
  }]});
  test("test act", () => {
    activityService.getActivityByTarget(2).then((data)=> {
      console.log(data);
      expect(data.length).toBe(1);
    });
  });
});