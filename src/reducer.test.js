import {
  ActionCreator,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
} from './reducer';

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      artist: `correct-artist`,
      picture: `correct-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      artist: `incorrect-artist-2`,
      picture: `incorrect-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(isGenreAnswerCorrect([false, false, true, false], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `0`,
        },
        {
          genre: `blues`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `jazz`,
          src: `3`,
        },
      ]
    })).toEqual(true);

    expect(isGenreAnswerCorrect([false, false, false, false], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `jazz`,
          src: `0`,
        },
        {
          genre: `jazz`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `blues`,
          src: `3`,
        },
      ]
    })).toEqual(false);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns action with 1 pay`, () => {
    expect(ActionCreator.incrementStep([
      {
        type: `artist`,
        song: {
          artist: ``,
          src: ``,
        },
        answers: [
          {
            artist: ``,
            picture: ``,
          },
          {
            artist: ``,
            picture: ``,
          },
          {
            artist: ``,
            picture: ``,
          },
        ]
      },
      {
        type: `genre`,
        genre: ``,
        answers: [
          {
            genre: ``,
            src: ``,
          },
          {
            genre: ``,
            src: ``,
          },
          {
            genre: ``,
            src: ``,
          },
          {
            genre: ``,
            src: ``,
          },
        ]
      }
    ], 0)).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing step returns reset`, () => {
    expect(ActionCreator.incrementStep([
      {
        type: `artist`,
        song: {
          artist: ``,
          src: ``,
        },
        answers: [
          {
            artist: ``,
            picture: ``,
          },
          {
            artist: ``,
            picture: ``,
          },
          {
            artist: ``,
            picture: ``,
          },
        ]
      },
      {
        type: `genre`,
        genre: ``,
        answers: [
          {
            genre: ``,
            src: ``,
          },
          {
            genre: ``,
            src: ``,
          },
          {
            genre: ``,
            src: ``,
          },
          {
            genre: ``,
            src: ``,
          },
        ]
      }
    ], 2)).toEqual({
      type: `RESET`,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 pay`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `correct`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    })).toEqual({
      type: `INCREMENT_MISTAKE`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 pay`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    })).toEqual({
      type: `INCREMENT_MISTAKE`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 pay`, () => {
    expect(ActionCreator.incrementMistake([false, true, false, false], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        },
        {
          genre: `jazz`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
      ]
    })).toEqual({
      type: `INCREMENT_MISTAKE`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 pay`, () => {
    expect(ActionCreator.incrementMistake([true, true, true, true], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
      ]
    })).toEqual({
      type: `INCREMENT_MISTAKE`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns reset`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, Infinity, 0)).toEqual({
      type: `RESET`,
    });

    expect(ActionCreator.incrementMistake([true, true, true, true], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
      ]
    }, Infinity, 0)).toEqual({
      type: `RESET`,
    });
  });

  it(`Action Creator for decrement second returns action with 1000 pay`, () => {
    expect(ActionCreator.decrementSecond(2000)).toEqual({
      type: `DECREMENT_SECOND`,
      payload: 1000,
    });
  });

  it(`Action Creator for decrement second returns reset`, () => {
    expect(ActionCreator.decrementSecond(1000)).toEqual({
      type: `RESET`,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    }, {
      type: `INCREMENT_STEP`,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    }, {
      type: `INCREMENT_STEP`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    });
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    }, {
      type: `INCREMENT_MISTAKE`,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
      errorCount: 3,
      gameTime: 300000,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    }, {
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    });
  });

  it(`Reducer should correctly decrement number of gameTime by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    }, {
      type: `DECREMENT_SECOND`,
      payload: 1000,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 299000,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    }, {
      type: `DECREMENT_SECOND`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 1000000,
      mistakes: 12309,
      errorCount: 3,
      gameTime: 1000,
    }, {
      type: `RESET`,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
    });
  });
});
