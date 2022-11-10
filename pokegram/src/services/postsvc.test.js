import { expect, test } from '@jest/globals';
import postsService from './postsService';
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mockAxios = new MockAdapter(axios);

describe("get Comm List Test", () => {
  mockAxios.onGet().reply(200, [{
    id:1,
    postId:2,
    timestamp: '2022-11-10',
    content: 'test',
    referredUser: [],
    commentorid: 1
  }]);
  test("test comments", () => {
    commentService.getCommentBypostId(2).then((data)=> {
      expect(data.length).toBe(1);
    });
  });
});