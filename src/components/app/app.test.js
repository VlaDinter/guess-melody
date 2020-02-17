import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';

const mock = [
  {
    type: `genre`,
    genre: `country`,
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
  },
  {
    type: `artist`,
    song: {
      artist: `Jack Daniels`,
      src: `path.mp3`,
    },
    answers: [
      {
        picture: `path.jpg`,
        artist: `Jim Beam`,
      },
      {
        picture: `path.jpg`,
        artist: `John Snow`,
      },
      {
        picture: `path.jpg`,
        artist: `Jack Daniels`,
      },
    ],
  },
];

it(`App correctly renders after relaunch`, () => {
  const tree = renderer.create(<App
    questions={mock}
    step={0}
    mistakes={0}
    maxMistakes={0}
    gameTime={0}
    onUserAnswer={jest.fn()}
    onWelcomeScreenClick={jest.fn()}
    decrementSecond={jest.fn()}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
