import React, { useContext } from 'react'
import { Context } from '../../context/UserContext'

const Profile = () => {
    const [ user, setUser ] = useContext(Context);
  return (
    <div>
        <h2>{user.username} Page!</h2>
    </div>
  )
}

export default Profile