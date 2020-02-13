import React from 'react';
import renderer from 'react-test-renderer';

import ArtisrQuestionScreen from './artist-question-screen.jsx';

const mock = {
  song: {
    artist: `John Snow`,
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
