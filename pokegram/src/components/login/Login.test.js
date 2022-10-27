/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Login from './Login';
import RootState from '../../models/rootState';
import '@testing-library/jest-dom/extend-expect';


const parentStates = new RootState(
  false,
  false,
  -1,
  (newLogin, newReg, newMyUID) => {
    console.log(newLogin, newReg, newMyUID);
  }
);

test('test Login snapshot', () => {
  const loginComp = renderer.create(<Login />);
  const tree = loginComp.toJSON();
  // console.log(loginComp.toJSON());
  expect(tree).toMatchSnapshot();
});

// test('test button click')
test('login button', () => {
  render(<Login />);
  const submit = screen.getByTestId("login_submit");
  const username = screen.getByTestId("test_username");
  expect(username.value).toBe(undefined);
  console.log(submit);
  fireEvent.click(submit);
  // const instance =
  // await userEvent.click(submit);
  //expect(submit.onSubmit).toHaveBeenCalled();
});

test('signup button', () => {
  render(<Login parStates={parentStates} />);
  const signup= screen.getByTestId("login_signup");
  const password = screen.getByTestId("test_password");
  expect(password.value).toBe(undefined);
  console.log(signup);
  fireEvent.click(signup);
  // const instance =
  // await userEvent.click(submit);
  //expect(submit.onSubmit).toHaveBeenCalled();
});