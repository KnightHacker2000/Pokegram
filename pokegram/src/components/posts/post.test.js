/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Post from './Post';
import HomeState from '../../models/homeState';
import '@testing-library/jest-dom/extend-expect';

const parentStates = new HomeState(
  2,
  (isLogOut, newIsProf, newIsAct, newIsUp, newIsPosts, newUID) => {
    console.log(isLogOut, newIsProf, newIsAct, newIsUp, newIsPosts, newUID);
  },
  false,
  false,
  true,
  false,
  2
);

test('test post snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Post homeStates={parentStates} />);
  const postComp = renderer.getRenderOutput();
  expect(postComp).toMatchSnapshot();
});