import React from 'react';
import renderer from 'react-test-renderer';

import WinScreen from './win-screen.jsx';

it(`WinScreen is rendered correctly`, () => {
  const tree = renderer.create(<WinScreen
    gameTime={0}
    mistakes={0}
    questionsLength={0}
    onRestartGame={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
