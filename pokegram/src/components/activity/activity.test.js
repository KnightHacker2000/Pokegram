/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import Act from './activity';
import '@testing-library/jest-dom/extend-expect';
import Activity from '../../models/activity';

test('test activity snapshot', () => {
  const actComp = renderer.create(<Act.Act />);
  const tree = actComp.toJSON();
  // console.log(loginComp.toJSON());
  expect(tree).toMatchSnapshot();
});

describe("Parse Text-1", () => {
  const act = new Activity();
  act.id = 1;
  act.initiatorId = 2;
  act.targetId = 1;
  act.activityType = 'Follow';
  act.timestamp = Date.now;

  test("check parseActText ", () => {
    expect(Act.parseActText(act)).toBe(' followed you!');
  });
});

describe("Parse Text-2", () => {
  const act = new Activity();
  act.id = 1;
  act.initiatorId = 2;
  act.targetId = 1;
  act.activityType = 'Unfollow';
  act.timestamp = Date.now;

  test("check parseActText ", () => {
    expect(Act.parseActText(act)).toBe(' unfollowed you!');
  });
});

describe("Parse Text-3", () => {
  const act = new Activity();
  act.id = 1;
  act.initiatorId = 2;
  act.targetId = 1;
  act.activityType = 'Like';
  act.timestamp = Date.now;

  test("check parseActText ", () => {
    expect(Act.parseActText(act)).toBe(' liked your post!');
  });
});

describe("Parse Text-4", () => {
  const act = new Activity();
  act.id = 1;
  act.initiatorId = 2;
  act.targetId = 1;
  act.activityType = 'Comment';
  act.timestamp = Date.now;

  test("check parseActText ", () => {
    expect(Act.parseActText(act)).toBe(' commented your post!');
  });
});