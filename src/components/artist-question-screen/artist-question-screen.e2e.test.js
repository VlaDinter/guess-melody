import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArtistQuestionScreen from './artist-question-screen.jsx';

configure({
  adapter: new Adapter(),
});

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

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const onAnswer = jest.fn();
  const artistQuestionScreen = shallow(<ArtistQuestionScreen
    step={0}
    song={mock.song}
    answers={mock.answers}
    onAnswer={onAnswer}
  />);

  const answerInput = artistQuestionScreen.find(`input`).at(0);
  answerInput.simulate(`click`);

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenNthCalledWith(1, {
    picture: `path.jpg`,
    artist: `Jim Beam`,
  });
});
