import React from 'react';
import renderer from 'react-test-renderer';

import ErrorQuestionScreen from './error-question-screen.jsx';

it(`ErrorQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(<ErrorQuestionScreen
    mistakes={0}
    maxMistakes={0}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
