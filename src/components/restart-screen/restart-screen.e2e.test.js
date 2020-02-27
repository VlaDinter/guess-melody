import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RestartScreen from './restart-screen.jsx';

configure({
  adapter: new Adapter(),
});

it(`RestartScreen is correctly rendered after click`, () => {
  const clickHandler = jest.fn();
  const restartScreen = shallow(<RestartScreen
    onRestartGame={clickHandler}
  />);

  const restartButton = restartScreen.find(`button`).at(1);
  restartButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
