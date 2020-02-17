import React from 'react';
import renderer from 'react-test-renderer';

import ArtisrQuestionScreen from './artist-question-screen.jsx';

const mock = {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
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
};

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(<ArtisrQuestionScreen
    step={0}
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
