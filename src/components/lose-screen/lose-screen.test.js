import React from 'react';
import renderer from 'react-test-renderer';

import LoseScreen from './lose-screen.jsx';

it(`LoseScreen is rendered correctly`, () => {
  const tree = renderer.create(<LoseScreen
    timeOver={true}
    onRestartGame={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
