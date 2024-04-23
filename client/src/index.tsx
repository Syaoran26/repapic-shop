import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MuiProvider from './contexts/MuiProvider';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <MuiProvider>
      <App />
    </MuiProvider>
  </Provider>,
);
