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
import Profile from './components/Profile/Profile';

function App() {

	return (
		<div name='App'>
			<Toaster />
					<Routes>
						<Route path='/' element={ <Welcome /> } /> 
						<Route path='/home' element={ <Home />} />
						<Route path='/profile' element={ <Profile />} />
						<Route path='/register' element={ <Register /> } />
					</Routes>
    	</div>
	);
}

export default App;
