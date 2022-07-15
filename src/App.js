import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
//User Context
import { Context } from './context/UserContext';

//Components for routing;
import Welcome from './components/Welcome/Welcome';
import Register from './components/Register/Register';
import Home from'./components/Home/Home';

function App() {
	const navigate = useNavigate();
	const [ user, setUser ] = useContext(Context);

	//Check if we have logged user.
	useEffect(() => {

		//Getting user from Locale Storage and navigate to home page.
		const currentUser = JSON.parse(localStorage.getItem('user'));
		setUser(currentUser);
		
		toast.success(`Welcome ${currentUser.username}.`);
		navigate('/home');

	}, [setUser])
	
	return (
		<div name='App'>
			<Toaster />
			<Routes>
				<Route path='/home' element={ <Home />} />
				<Route path='/register' element={ <Register /> } />
				<Route path='/' element={ <Welcome /> } /> 
        	</Routes>
    	</div>
	);
}

export default App;
