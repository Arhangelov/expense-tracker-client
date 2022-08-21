import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import { Context } from '../../context/UserContext';
import toast, { Toaster } from 'react-hot-toast';

//Styles
import './WelcomeStyle.css';
import { getUser } from '../../services/authService';


const Welcome = () => {
	const navigate = useNavigate();
	const [ user, setUser ] = useContext(Context);

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
	
  return (
    <div className='container'>
      <Toaster />
        <h2 className='welcome'>Welcome to the Expense-Tracker App</h2>
        <Login />
        <p className='welcome-p'>If u don't have an account please <Link to='/register'>Register</Link></p>
    </div>
  )
}

export default Welcome