import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TimerQuestionScreen from './timer-question-screen.jsx';

configure({
  adapter: new Adapter(),
});

jest.useFakeTimers();

it(`Timer in TimerQuestionScreen is correctly works`, () => {
  const decrementSecond = jest.fn();
  const timerQuestionScreen = shallow(<TimerQuestionScreen
    gameTime={0}
    decrementSecond={decrementSecond}
  />);

  timerQuestionScreen.instance();

  expect(decrementSecond).not.toBeCalled();

  jest.advanceTimersByTime(1000);

  expect(decrementSecond).toBeCalled();
  expect(decrementSecond).toHaveBeenCalledTimes(1);
});
