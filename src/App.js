import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

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
