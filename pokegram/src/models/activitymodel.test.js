import {expect, test} from '@jest/globals';
import Activity from './activity';

describe("New Activity", () => {
    const temp = new Activity();
    temp.id = 2;
    temp.initiatorId = 12;
    temp.targetId = 1;
    temp.activityType = "Follow";
    temp.timestamp = new Date();
    temp.timestamp = temp.timestamp.toString();
  
    test("check post info", () => {
        expect(temp.id).toBe(2);
    });
  });