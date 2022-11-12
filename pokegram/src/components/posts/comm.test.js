/**
 * @jest-environment jsdom
 */
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ShallowRenderer from 'react-test-renderer/shallow';
import Comment from './Comment';
import '@testing-library/jest-dom/extend-expect';
import { test } from '@jest/globals';

Enzyme.configure({adapter: new Adapter()});

test('test comments snapshot', () => {
  const renderer = new ShallowRenderer();
  // const realUseState = React.useState;
  // const stubInitialState = ['test'];
  // React.useState = jest.fn().mockReturnValue(stubInitialState);
  // useState.mockImplementationOnce(() => realUseState(stubInitialState));
  renderer.render(<Comment uid={1} pid={"2"} handleCommentState={()=>{}}/>);
  const comComp = renderer.getRenderOutput();
  // comComp.props.children.props.children.props.children[0].props.children[1].props.onClick({ preventDefault: () => {} });
  // .props.children[0].props.children[1]
  expect(comComp).toMatchSnapshot();
});

test('test add comm', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Comment uid={1} pid={"2"} handleCommentState={()=>{}}/>);
  const comComp = renderer.getRenderOutput();
  comComp.props.children.props.children.props.children[0].props.children[1].props.onClick({ preventDefault: () => {} });
});

test('test clear comm', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Comment uid={1} pid={"2"} handleCommentState={()=>{}}/>);
  const comComp = renderer.getRenderOutput();
  comComp.props.children.props.children.props.children[0].props.children[2].props.onClick({ preventDefault: () => {} });
});

test('test edit comm', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Comment uid={1} pid={"2"} handleCommentState={()=>{}}/>);
  const comComp = renderer.getRenderOutput();
  comComp.props.children.props.children.props.children[1].props.children[0].props.children[2].props.onClick({ currentTarget: {getAttribute: ()=>{}}, preventDefault: () => {} });
  // .children[2].props.onClick({ preventDefault: () => {} });
});

test('test delete comm', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Comment uid={1} pid={"2"} handleCommentState={()=>{}}/>);
  const comComp = renderer.getRenderOutput();
  comComp.props.children.props.children.props.children[1].props.children[0].props.children[3].props.onClick({ currentTarget: {getAttribute: ()=>{}}, preventDefault: () => {} });
  // .children[2].props.onClick({ preventDefault: () => {} });
});
