import React, { useState, useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import { logoutService } from '../../services/authService';

//Components
import Balance from '../Balance/Balance';
import AddTransaction from '../AddTransaction/AddTransaction';
import TransactionList from '../History/TransactionList';

//Styles
import './HomeStyle.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(Context);

  const onLogoutHandler = (e) => {
    e.preventDefault();
    logoutService().then(res => {
      localStorage.clear();
      toast.success(`${res.message}`);
			navigate('/');
    }).catch(err => {
      toast.error(`${err}`, {
        style: {
          fontSize: '.8rem',
          borderRadius: '25px',
          background: '#333',
          color: '#fff',
          }
      
      })
    })
  }

  return (
    <>
    <Toaster />
      <nav className='container-nav'>
        <Link className='navigation-profile' to='/profile'>{user.username}</Link>
        <button onClick={onLogoutHandler} className='navigation-logout' >Logout</button>
      </nav>
      <main className='container-main'>
        <h2> Dashboard </h2>
        <br />
        <Balance />
        <AddTransaction />
        <TransactionList/>
      </main>
    </>
  )
}

export default Home