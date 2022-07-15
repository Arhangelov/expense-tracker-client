import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
//Contexts
import { UserContext } from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <App />
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

