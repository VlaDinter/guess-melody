export default {
  settings: {
    errorCount: 3,
    gameTime: 5,
  },
  questions: [
    {
      type: `genre`,
      genre: `reggae`,
      answers: [
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/c/ce/A-window-into-the-brain-mechanisms-associated-with-noise-sensitivity-srep39236-s2.oga`,
          genre: `country`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/c/ce/A-window-into-the-brain-mechanisms-associated-with-noise-sensitivity-srep39236-s2.oga`,
          genre: `electronic`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/c/ce/A-window-into-the-brain-mechanisms-associated-with-noise-sensitivity-srep39236-s2.oga`,
          genre: `reggae`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/c/ce/A-window-into-the-brain-mechanisms-associated-with-noise-sensitivity-srep39236-s2.oga`,
          genre: `alternative`,
        },
      ],
    },
    {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `https://upload.wikimedia.org/wikipedia/commons/c/ce/A-window-into-the-brain-mechanisms-associated-with-noise-sensitivity-srep39236-s2.oga`,
      },
      answers: [
        {
          picture: `https://placehold.it/134x134`,
          artist: `John Snow`,
        },
        {
          picture: `https://placehold.it/134x134`,
          artist: `Jack Daniels`,
        },
        {
          picture: `https://placehold.it/134x134`,
          artist: `Jim Beam`,
        },
      ],
    },
  ],
};
