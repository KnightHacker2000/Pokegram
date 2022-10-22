/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import { render, screen, fireEvent } from '@testing-library/react';
 import renderer from 'react-test-renderer';
 import SignUp from './SignUp';
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

 test('test SignUp snapshot', () => {
   const SignUpComp = renderer.create(<SignUp />);
   const tree = SignUpComp.toJSON();
   // console.log(SignUpComp.toJSON());
   expect(tree).toMatchSnapshot();
 });
 
 // test('test button click')
 test('SignUp button', () => {
   render(<SignUp parStates={parentStates}/>);
  const submit = screen.getByTestId("signUp_submit");
  // const password = screen.getByTestId("test_username");
  // expect(password.value).toBe(undefined);
  console.log(submit);
  fireEvent.click(submit);
 });

 test('SignIn button', () => {
    render(<SignUp parStates={parentStates} />);
    const submit = screen.getByTestId("signIn_submit");
    fireEvent.click(submit);
    // console.log(signInsubmit);
  });