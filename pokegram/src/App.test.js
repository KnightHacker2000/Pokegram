/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
// import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test('test root', () => {
  const rootComp = renderer.create(<App />);
  // const tree = rootComp.toJson();
  console.log(rootComp.toJSON());
});
