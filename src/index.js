import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {reducer} from './reducer';
import questions from './mocks/questions';
import App from './components/app/app.jsx';

const init = (gameQuestions) => {
  const store = createStore(reducer);

  ReactDom.render(<Provider store={store}>
    <App
      questions={gameQuestions}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init(questions);

