import MockAdapter from 'axios-mock-adapter';

import api from '../api';
import {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  Operation,
  ActionCreator,
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
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1,
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

  it(`Action Creator for decrement second returns action with 1000 pay`, () => {
    expect(ActionCreator.decrementSecond()).toEqual({
      type: `DECREMENT_SECOND`,
      payload: 1000,
    });
  });

  it(`Action Creator for load questions returns action with questions pay`, () => {
    expect(ActionCreator.loadQuestions([{}, {}, {}])).toEqual({
      type: `LOAD_QUESTIONS`,
      payload: [{}, {}, {}],
    });
  });

  it(`Action Creator for reset returns action with reset type`, () => {
    expect(ActionCreator.reset()).toEqual({
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
      questions: [],
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    }, {
      type: `INCREMENT_STEP`,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    });
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    }, {
      type: `INCREMENT_MISTAKE`,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    }, {
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    });
  });

  it(`Reducer should correctly decrement number of gameTime by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    }, {
      type: `DECREMENT_SECOND`,
      payload: 1000,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 299000,
      questions: [],
    });
  });

  it(`Reducer should correctly load questions`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    }, {
      type: `LOAD_QUESTIONS`,
      payload: [{}, {}, {}],
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [{}, {}, {}],
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 1000000,
      mistakes: 12309,
      errorCount: 3,
      gameTime: 1000,
      questions: [{}, {}, {}],
    }, {
      type: `RESET`,
    })).toEqual({
      step: -1,
      mistakes: 0,
      errorCount: 3,
      gameTime: 300000,
      questions: [],
    });
  });

  it(`Should make a correct API call to /questions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const _ = null;
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_QUESTIONS`,
          payload: [{fake: true}],
        });
      });
  });
});
