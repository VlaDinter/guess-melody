import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen.jsx';

it(`WelcomeScreen correctly renders after relaunch`, () => {
  const tree = renderer.create(<WelcomeScreen
    errorCount={0}
    gameTime={0}
    onClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
