// npimport "@testing-library/jest-dom/extend-expect"
// import { fireEvent, render } from "@testing-library/react";
import React from "react";
import renderer from 'react-test-renderer';

import Login from '.././components/login/Login';

test('snap shot', () => {
  const component = renderer.create(<Login />);
  const tree = component.toJSON();
  console.log(tree);
});