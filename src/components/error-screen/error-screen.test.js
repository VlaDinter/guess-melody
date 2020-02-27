import React from 'react';
import renderer from 'react-test-renderer';

import ErrorScreen from './error-screen.jsx';

it(`ErrorScreen is rendered correctly`, () => {
  const tree = renderer.create(<ErrorScreen/>).toJSON();

  expect(tree).toMatchSnapshot();
});
