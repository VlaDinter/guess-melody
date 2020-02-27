const isArtistAnswerCorrect = (userAnswer, question) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every((it, i) => it === (
  question.answers[i].genre === question.genre
));

const Operation = {
  loadQuestions: () => (dispatch, _, api) => {
    return api.get(`/questions`)
      .then((response) => dispatch(ActionCreator.loadQuestions(response.data)));
  },
};

const initialState = {
  step: -1,
  mistakes: 0,
  errorCount: 3,
  gameTime: 300000,
  questions: [],
};

const ActionCreator = {
  incrementStep: () => {
    return {
      type: `INCREMENT_STEP`,
      payload: 1,
    };
  },

  incrementMistake: (userAnswer, question) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist` :
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;

      case `genre` :
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    return {
      type: `INCREMENT_MISTAKE`,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  decrementSecond: () => {
    return {
      type: `DECREMENT_SECOND`,
      payload: 1000,
    };
  },

  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };
  },

  reset: () => {
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

    case `LOAD_QUESTIONS`: return Object.assign({}, state, {
      questions: action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  Operation,
  ActionCreator,
  reducer,
};
