import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GenreQuestionScreen from './genre-question-screen.jsx';

configure({
  adapter: new Adapter(),
});

const mock = {
  type: `genre`,
  genre: `reggae`,
  answers: [
    {
      src: `test.mp3`,
      genre: `alternative`,
    },
    {
      src: `test.mp3`,
      genre: `electronic`,
    },
    {
      src: `test.mp3`,
      genre: `country`,
    },
    {
      src: `test.mp3`,
      genre: `reggae`,
    },
  ],
};

it(`When user answers genre question form is not sent`, () => {
  const onAnswer = jest.fn();
  const genreQuestionScreen = shallow(<GenreQuestionScreen
    step={0}
    genre={mock.genre}
    answers={mock.answers}
    onAnswer={onAnswer}
  />);

  const form = genreQuestionScreen.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`Rendered checkboxes are synchronized with state`, () => {
  const onAnswer = jest.fn();
  const genreQuestionScreen = shallow(<GenreQuestionScreen
    step={0}
    genre={mock.genre}
    answers={mock.answers}
    onAnswer={onAnswer}
  />);

  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([false, false, false, false]);

  const inputs = genreQuestionScreen.find(`input`);
  const inputOne = inputs.at(0);
  const inputTwo = inputs.at(1);

  inputOne.simulate(`change`);
  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([true, false, false, false]);

  inputOne.simulate(`change`);
  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([false, false, false, false]);

  inputTwo.simulate(`change`);
  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([false, true, false, false]);
});

it(`User answer passed to callback is consistent with internal component state`, () => {
  const onAnswer = jest.fn();
  const genreQuestionScreen = shallow(<GenreQuestionScreen
    step={0}
    genre={mock.genre}
    answers={mock.answers}
    onAnswer={onAnswer}
  />);

  const form = genreQuestionScreen.find(`form`);
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenNthCalledWith(1, [false, false, false, false]);
});
