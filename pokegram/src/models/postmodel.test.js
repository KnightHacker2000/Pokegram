import {expect, test} from '@jest/globals';
import Posts from './post';

describe("New Post", () => {
    const temp = new Posts();
    temp.id = 2;
    temp.username = "Anna";
    temp.timestamp = new Date();
    temp.type = "video";
    temp.content_url = "";
    temp.numLike = 10;
    temp.description = "this is my post";
    temp.commentRefs = [1, 2, 3];
    temp.users = [1, 2, 3];
    temp.timestamp = temp.timestamp.toString();
  
    test("check post info", () => {
        expect(temp.id).toBe(2);
    });
  });