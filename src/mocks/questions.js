export default {
  settings: {
    errorCount: 3,
    gameTime: 5,
  },
  questions: [
    {
      type: `genre`,
      genre: `electronic`,
      answers: [
        {
          src: `https://es31-server.appspot.com/guess-melody/static/music/Blue_Whale.mp3`,
          genre: `alternative`,
        },
        {
          src: `https://es31-server.appspot.com/guess-melody/static/music/Memories_Station_of_Tomorrow.mp3`,
          genre: `alternative`,
        },
        {
          src: `https://es31-server.appspot.com/guess-melody/static/music/Azure.mp3`,
          genre: `electronic`,
        },
        {
          src: `https://es31-server.appspot.com/guess-melody/static/music/Parkside.mp3`,
          genre: `country`,
        },
      ],
    },
    {
      type: `artist`,
      song: {
        artist: `Spazz Cardigan`,
        src: `https://es31-server.appspot.com/guess-melody/static/music/Nothin_Yet.mp3`,
      },
      answers: [
        {
          picture: `https://es31-server.appspot.com/guess-melody/static/artist/Jingle_Punks.jpg`,
          artist: `Jingle Punks`,
        },
        {
          picture: `https://es31-server.appspot.com/guess-melody/static/artist/Spazz_Cardigan.jpg`,
          artist: `Spazz Cardigan`,
        },
        {
          picture: `https://es31-server.appspot.com/guess-melody/static/artist/Dan_Lebowitz.jpg`,
          artist: `Dan Lebowitz`,
        },
      ],
    },
  ],
};
