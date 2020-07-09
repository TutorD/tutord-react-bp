import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import Index from "./components";
import {Provider} from 'react-redux';
import {ConnectedRouter as Router} from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles, { getTheme } from './styles';
import store, {history} from './store';

import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';

import messages from './i18n/messages';
import { flattenMessages } from './lib/utils';

let theme = getTheme();

let locale =
  (navigator.language && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <ThemeProvider theme={theme}>
          <Index />
          <GlobalStyles />
        </ThemeProvider>
      </IntlProvider>
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
