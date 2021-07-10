import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';
import { AuthProvider } from './store/AuthContext';
import { AppProvider } from './store/AppContext';
import { APIErrorProvider } from './store/APIErrorContext';
import { APIInfoProvider } from './store/APIInfoContext';
import { APILoadingProvider } from './store/APILoadingContext';

import 'moment/locale/es';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <APILoadingProvider>
        <APIErrorProvider>
          <APIInfoProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </APIInfoProvider>
        </APIErrorProvider>
      </APILoadingProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
