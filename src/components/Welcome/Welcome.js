import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
//Styles
import './WelcomeStyle.css';


const Welcome = () => {
  return (
    <div className='container'>
        <h2 className='welcome'>Welcome to the Expense-Tracker App</h2>
        <Login />
        <p className='welcome-p'>If u don't have an account please <Link to='/register'>Register</Link></p>
    </div>
  )
}

export default Welcome