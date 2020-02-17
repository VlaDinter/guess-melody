import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TimerQuestionScreen from './timer-question-screen.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Timer in TimerQuestionScreen is correctly works`, () => {
  const decrementSecond = jest.fn();
  const timerQuestionScreen = shallow(<TimerQuestionScreen
    gameTime={0}
    decrementSecond={decrementSecond}
  />);

  const instance = timerQuestionScreen.instance();
  jest.spyOn(instance, `_tick`);
  instance.render();

  expect(instance._tick).toHaveBeenCalledTimes(1);
});
