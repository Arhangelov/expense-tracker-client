import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/UserContext';

//Styles
import './HomeStyle.css';

const Home = () => {
  const [user, setUser] = useContext(Context);
  return (
    <>
      <nav className='container-nav'>
        <Link className='navigation-profile' to='/profile'>{user.username}</Link>
        <button className='navigation-logout' >Logout</button>
      </nav>
      <main className='container-main'>
        <h2> Dashboard </h2>

      </main>
    </>
  )
}

export default Home