/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Posts from './post';
import '@testing-library/jest-dom/extend-expect';

test('test Post snapshot', () => {
  const postComp = renderer.create(<Posts />);
  const tree = postComp.toJSON();
  console.log(postComp.toJSON());
  expect(tree).toMatchSnapshot();
});