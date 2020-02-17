import React from 'react';
import renderer from 'react-test-renderer';

import TimerQuestionScreen from './timer-question-screen.jsx';

it(`TimerQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(<TimerQuestionScreen
    gameTime={0}
    decrementSecond={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
