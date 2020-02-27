import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player.jsx';

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/c/ce/A-window-into-the-brain-mechanisms-associated-with-noise-sensitivity-srep39236-s2.oga`
};

it(`AudioPlayer is rendered correctly`, () => {
  const tree = renderer.create(<AudioPlayer
    src={mock.src}
    isPlaying={true}
    onPlayButtonClick={jest.fn()}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
