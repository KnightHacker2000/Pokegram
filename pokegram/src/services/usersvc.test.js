import { expect, test } from '@jest/globals';
import User from '../models/user';
import UserService from './userService';

describe("Follow Test", () => {
  const temp = new User();
  temp.id = 1;
  temp.follows = [];

  const tar = new User();
  tar.id = 1;
  tar.subscribers = [];

  test("test unfollow", () => {
      expect(UserService.followUser(temp, 2).follows).toBe(undefined);
  });
});

describe("remove like", () => {
  const temp = new User();
  temp.id = 1;
  temp.likedPosts = [10, 2];

  const tar = new User();
  tar.id = 1;
  tar.subscribers = [];

  test("test unlike", () => {
      expect(UserService.removeLike(temp, 2).likedPosts).toBe(undefined);
  });
});

describe("Unfollow Test", () => {
  const temp = new User();
  temp.id = 1;
  temp.follows = [2];

  const tar = new User();
  tar.id = 1;
  tar.subscribers = [1];

  test("test unfollow", () => {
      expect(UserService.unfollowUser(temp, 2).follows).toBe(undefined);
  });
});