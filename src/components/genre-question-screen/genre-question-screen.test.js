import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
  genre: `country`,
  answers: [
    {
      src: `test.mp3`,
      genre: `alternative`,
    },
    {
      src: `test.mp3`,
      genre: `reggae`,
    },
    {
      src: `test.mp3`,
      genre: `electronic`,
    },
    {
      src: `test.mp3`,
      genre: `country`,
    },
  ],
};

it(`GenreQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(<GenreQuestionScreen
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

