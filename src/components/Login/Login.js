import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import { loginService } from '../../services/authService';
import toast, { Toaster } from 'react-hot-toast';
//Styles
import './LoginStyle.css'


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ user, setUser] = useContext(Context);

    const onLoginFormSubmitHandler = (e) => {
        e.preventDefault();
        loginService(email, password)
            .then((res) => {
              if (res.errors){
                const errMsg = res.errors.map(err => err.msg);
                throw new Error(errMsg);
              }; 
                const loggedUser = { email: res.userDTO.email, username: res.userDTO.username };
                setUser(loggedUser);
                const loggedUserSringify = JSON.stringify(loggedUser);
                localStorage.setItem('user', loggedUserSringify );
                localStorage.setItem('userToken', res.token );
                navigate('/home')
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
        <section className='section-login'>
          <form onSubmit={onLoginFormSubmitHandler}>
              <label htmlFor='email'>Email</label>
              <input name='email' type='text' onChange={(e) => setEmail(e.target.value)}/>
            
              <label htmlFor='password'>Password</label>
              <input name='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
              <br/><br/>
              <input type='submit' value={'Login'}/>
          </form>
        </section>
      </>
    )
}

export default Login