/**
 * @jest-environment jsdom
 */
import React from 'react';
//  import { fireEvent, render } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TagPhoto from './Tag';
import '@testing-library/jest-dom/extend-expect';
// import { test } from '@jest/globals';

test('test tagging snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<TagPhoto PID={2} handleTagState={()=> {}} />);
  const tagComp = renderer.getRenderOutput();
  // expect(tree).toMatchSnapshot();
});

// test('test profile click', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<ResponsiveAppBar homeStates={parentStates} />);
//   const res = renderer.getRenderOutput();
//   // const sha = shallow()
//   // const tree = menuComp.toJSON();
//   res.props.children.props.children.props.children[0].props.onClick();
//   // expect(tree).toMatchSnapshot();
// });

// test('test follow button', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<Profile homeStates={parentStates} />);
//   const res = renderer.getRenderOutput();
//   res.props.children[0].props.children.props.children[1].props.children[0].props.children[1].props.onClick({ preventDefault: () => {} });
// });