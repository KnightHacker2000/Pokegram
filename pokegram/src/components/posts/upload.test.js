/**
 * @jest-environment jsdom
 */
import React from 'react';
// import renderer from 'react-test-renderer';
// import { render, screen, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Upload from './Upload';
import HomeState from '../../models/homeState';
import '@testing-library/jest-dom/extend-expect';

test('test Upload snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Upload />);
  renderer.getRenderOutput();
  // const uploadComp = renderer.getRenderOutput();
  // console.log(uploadComp);
  //  expect(tree).toMatchSnapshot();
});

const parentStates = new HomeState(
  2,
  (isLogOut, newIsProf, newIsAct, newIsUp, newIsPosts, newUID) => {
    console.log(isLogOut, newIsProf, newIsAct, newIsUp, newIsPosts, newUID);
  },
  false,
  false,
  true,
  false,
  1
);

test('upload button', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Upload homeStates={parentStates} />);
  // render(<Login parStates={parentStates} />);
  const res = renderer.getRenderOutput();
  res.props.children.props.onSubmit({ preventDefault: () => {} });
});
