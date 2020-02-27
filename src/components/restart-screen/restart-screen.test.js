import React from 'react';
import renderer from 'react-test-renderer';

import RestartScreen from './restart-screen.jsx';

it(`RestartScreen is rendered correctly`, () => {
  const tree = renderer.create(<RestartScreen
    onRestartGame={jest.fn()}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
