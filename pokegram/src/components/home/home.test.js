/**
 * @jest-environment jsdom
 */
import React from 'react';
// import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import RootState from '../../models/rootState';
import Home from './home';
import HomeState from '../../models/homeState';
import ResponsiveAppBar from './menu';
import '@testing-library/jest-dom/extend-expect';

test('test Menu snapshot', () => {
  const renderer = new ShallowRenderer();
  const menuComp = renderer.render(<ResponsiveAppBar />);
  // const sha = shallow()
  // const tree = menuComp.toJSON();
  console.log(menuComp);
  // expect(tree).toMatchSnapshot();
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

test('test menu nav open', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ResponsiveAppBar homeStates={parentStates} />);
  const res = renderer.getRenderOutput();
  // const sha = shallow()
  // const tree = menuComp.toJSON();
  const event = {
    preventDefault: () => {},
    target: {
      name: 'fullName',
      value: 'test'
    }
  };
  res.props.children.props.children.props.children[1].props.children[0].props.onClick(event);
  // expect(tree).toMatchSnapshot();
});

test('test menu nav close', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ResponsiveAppBar homeStates={parentStates} />);
  const res = renderer.getRenderOutput();
  // const sha = shallow()
  // const tree = menuComp.toJSON();
  const event = {
    preventDefault: () => {},
    target: {
      name: 'fullName',
      value: 'test'
    }
  };
  res.props.children.props.children.props.children[1].props.children[1].props.onClose(event);
  // expect(tree).toMatchSnapshot();
});

test('test menu prof click', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ResponsiveAppBar homeStates={parentStates} />);
  const res = renderer.getRenderOutput();
  // const sha = shallow()
  // const tree = menuComp.toJSON();
  const event = {
    preventDefault: () => {},
    target: {
      name: 'fullName',
      value: 'test'
    }
  };
  res.props.children.props.children.props.children[4].props.children.props.children.props.onClick(event);
  // expect(tree).toMatchSnapshot();
});

test('test Home snapshot', () => {
  const defaultProps = new RootState(
    true,
    true,
    1,
    (newLogin, newReg, newMyUID) => {
      console.log(newLogin, newReg, newMyUID);
    }
  );
  const renderer = new ShallowRenderer();
  renderer.render(<Home parStates={defaultProps} />);
  const homeComp = renderer.getRenderOutput();
  console.log(homeComp);
  // const homeComp = renderer.create(<Home parStates={defaultProps} />);
  // const tree = homeComp.toJSON();
  // console.log(homeComp.toJSON());
  // expect(homeComp.toJSON()).toMatchSnapshot();
});