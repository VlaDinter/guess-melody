import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from './audio-player.jsx';

configure({
  adapter: new Adapter(),
});

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/c/ce/A-window-into-the-brain-mechanisms-associated-with-noise-sensitivity-srep39236-s2.oga`
};

it(`AudioPlayer is correctly rendered after click`, () => {
  const clickHandler = jest.fn();
  const audioPlayer = mount(<AudioPlayer
    src={mock.src}
    isPlaying={false}
    onPlayButtonClick={clickHandler}
  />);

  const instance = audioPlayer.instance();

  expect(audioPlayer.state(`isPlaying`)).toEqual(false);

  instance._onPlayButtonClick();
  expect(audioPlayer.state(`isPlaying`)).toEqual(true);

  instance._onPlayButtonClick();
  expect(audioPlayer.state(`isPlaying`)).toEqual(false);
});
