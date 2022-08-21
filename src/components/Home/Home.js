import React, { useState, useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import { getUser, logoutService } from '../../services/authService';

//Components
import Balance from '../Balance/Balance';
import AddTransaction from '../AddTransaction/AddTransaction';
import TransactionList from '../History/TransactionList';
import IncomeChart from '../IncomeChart/IncomeChart';
import ExpenseChart from '../ExpenseChart/ExpenseChart';

//Styles
import './HomeStyle.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(Context);

		//Check if we have logged user.
		useEffect(() => {
			//Getting user from Locale Storage and navigate to home page.
			const currentUser = JSON.parse(localStorage.getItem('user'));
			console.log(currentUser)
			if (currentUser){
				getUser(currentUser.username, currentUser.email)
				.then(({ loggedUser }) => {
					setUser({ email:loggedUser.email, username:loggedUser.username });
					toast.success(`Welcome ${loggedUser.username}.`);
					navigate('/home');
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
		}, [])

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
      <div className="home-container">
        <div className="container-income">
          <IncomeChart />
        </div>
        <main className='container-main'>
          <h2> Dashboard </h2>
          <br />
          <Balance />
          <AddTransaction />
          <TransactionList/>
        </main>
        <div className="container-expense">
          <ExpenseChart />
        </div>
      </div>
    </>
  )
}

export default Home