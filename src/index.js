import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app/app.jsx';
import mocks from './mocks/questions';

const init = (gameQuestions) => {
  const {
    settings,
    questions,
  } = gameQuestions;

  ReactDom.render(
      <App
        gameTime={settings.gameTime}
        errorCount={settings.errorCount}
        questions={questions}
      />,
      document.querySelector(`#root`)
  );
};

init(mocks);

