import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WinScreen from './win-screen.jsx';

configure({
  adapter: new Adapter(),
});

it(`WinScreen is correctly rendered after click`, () => {
  const clickHandler = jest.fn();
  const winScreen = shallow(<WinScreen
    gameTime={0}
    mistakes={0}
    questionsLength={0}
    onRestartGame={clickHandler}
  />);

  const restartButton = winScreen.find(`button`);
  restartButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
