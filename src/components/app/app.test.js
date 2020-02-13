import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

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
  },
  {
    type: `John Snow`,
    song: {
      artist: `Unicorn Heads`,
      src: `path.mp3`,
    },
    answers: [
      {
        picture: `path.jpg`,
        artist: `Jack Daniels`,
      },
      {
        picture: `path.jpg`,
        artist: `Jim Beam`,
      },
      {
        picture: `path.jpg`,
        artist: `John Snow`,
      },
    ],
  },
];

it(`App correctly renders after relaunch`, () => {
  const tree = renderer.create(<App
    gameTime={0}
    errorCount={0}
    questions={mock}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
