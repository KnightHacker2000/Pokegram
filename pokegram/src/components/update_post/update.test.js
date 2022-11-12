/**
 * @jest-environment jsdom
 */
import React from 'react';
//  import { fireEvent, render } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UpdatePost from './update_post';
import '@testing-library/jest-dom/extend-expect';
// import { test } from '@jest/globals';

test('test update snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UpdatePost PID={2} handleEditState={()=> {}} />);
  const UpdateComp = renderer.getRenderOutput();
  expect(UpdateComp).toMatchSnapshot();
});

test('test submit click', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UpdatePost PID={2} handleEditState={()=> {}} />);
  const res = renderer.getRenderOutput();
  // const sha = shallow()
  // const tree = menuComp.toJSON();
  // console.log();
  res.props.children.props.children.props.children[1].props.onSubmit({ preventDefault: () => {} });
  // expect(tree).toMatchSnapshot();
});

test('test onClear', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UpdatePost PID={2} handleEditState={()=> {}} />);
  const res = renderer.getRenderOutput();
  // const sha = shallow()
  // const tree = menuComp.toJSON();
// console.log(
  res.props.children.props.children.props.children[0].props.onClick({ preventDefault: () => {} });
  // expect(tree).toMatchSnapshot();
});

test('test select onChange', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UpdatePost PID={2} handleEditState={()=> {}} />);
  const res = renderer.getRenderOutput();
  // const sha = shallow()
  // const tree = menuComp.toJSON();
  res.props.children.props.children.props.children[1].props.children[0].props.children.props.children[1].props.onChange({target: {value: '123'}}, { preventDefault: () => {} });
  // .props.onSubmit({ preventDefault: () => {} });
  // expect(tree).toMatchSnapshot();
});

// test('test follow button', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<Profile homeStates={parentStates} />);
//   const res = renderer.getRenderOutput();
//   res.props.children[0].props.children.props.children[1].props.children[0].props.children[1].props.onClick({ preventDefault: () => {} });
// });