/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Comment from './Comment';
import '@testing-library/jest-dom/extend-expect';

test('test comments snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Comment uid={1} pid={"2"} handleCommentState={()=> {}} />);
  const comComp = renderer.getRenderOutput();
  expect(comComp).toMatchSnapshot();
});