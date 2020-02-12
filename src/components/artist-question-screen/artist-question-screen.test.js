import React from 'react';
import renderer from 'react-test-renderer';

import ArtisrQuestionScreen from './artist-question-screen.jsx';

const mock = {
  type: `artist`,
  song: {
    artist: `Unicorn Heads`,
    src: `path.mp3`,
  },
  answers: [
    {
      picture: `path.jpg`,
      artist: `Spazz Cardigan`,
    },
    {
      picture: `path.jpg`,
      artist: `Density & Time`,
    },
    {
      picture: `path.jpg`,
      artist: `Unicorn Heads`,
    },
  ],
};

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(<ArtisrQuestionScreen
    song={mock.song}
    answers={mock.answers}
    onAnswer={jest.fn()}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
