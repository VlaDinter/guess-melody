const isArtistAnswerCorrect = (userAnswer, question) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every((it, i) => it === (
  question.answers[i].genre === question.genre
));

const initialState = {
  step: -1,
  mistakes: 0,
  errorCount: 3,
  gameTime: 300000,
};

const ActionCreator = {
  incrementStep: (questions, step) => {
    if (step < questions.length - 1) {
      return {
        type: `INCREMENT_STEP`,
        payload: 1,
      };
    }

    return {
      type: `RESET`,
    };
  },

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist` :
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;

      case `genre` :
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_MISTAKE`,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  decrementSecond: (gameTime) => {
    if (gameTime - 1000) {
      return {
        type: `DECREMENT_SECOND`,
        payload: 1000,
      };
    }

    return {
      type: `RESET`,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP` : return Object.assign({}, state, {
      step: state.step + action.payload,
    });

    case `INCREMENT_MISTAKE` : return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload,
    });

    case `DECREMENT_SECOND` : return Object.assign({}, state, {
      gameTime: state.gameTime - action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {
  ActionCreator,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
