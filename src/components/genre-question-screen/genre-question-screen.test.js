import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen.jsx';

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

it(`GenreQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(<GenreQuestionScreen
    step={0}
    genre={mock.genre}
    answers={mock.answers}
    onAnswer={jest.fn()}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

