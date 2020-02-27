import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoseScreen from './lose-screen.jsx';

configure({
  adapter: new Adapter(),
});

it(`LoserScreen is correctly rendered after click`, () => {
  const clickHandler = jest.fn();
  const loseScreen = shallow(<LoseScreen
    timeOver={true}
    onRestartGame={clickHandler}
  />);

  const restartButton = loseScreen.find(`button`);
  restartButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
