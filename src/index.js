import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
//Contexts
import { UserContext } from './context/UserContext';
import { TransactionProvider } from './context/TransactionContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

