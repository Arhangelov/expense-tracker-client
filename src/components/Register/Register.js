import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import { registerService } from '../../services/authService';
import toast, { Toaster } from "react-hot-toast";
import './RegisterStyle.css'
//Icons
import {  FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{5,28}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/;


const Register = () => {
    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
  
    const [user, setUser] = useContext(Context);

  useEffect(() => {
      emailRef.current.focus();
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
      setValidUsername(USERNAME_REGEX.test(username));
  }, [username])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === confirmPwd);
  }, [pwd, confirmPwd])

  useEffect(() => {
      setErrMsg('');
  }, [username, pwd, confirmPwd])

  const onRegisterSubmitHandler = (e) => {

    e.preventDefault();
    registerService( email, username, pwd, confirmPwd )
      .then((res) => {
        if (res.errors){
          const errMsg = res.errors.map(err => err.msg);
          throw new Error(errMsg);
        } 
        setUser({ email: res.newUserDTO.email, username: res.newUserDTO.username });
        const currentUserStringify = JSON.stringify({ email: res.newUserDTO.email, username: res.newUserDTO.username });
        localStorage.setItem('user', currentUserStringify);
        localStorage.setItem('userToken', res.token);
        navigate('/home');
      }).catch(err => {
        toast.error(`${err}`, {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            }
        
        })
      })
  }
  return (
    <>
      <Toaster/>
      <section className='section-register'>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h2>Register</h2>
        <form onSubmit={onRegisterSubmitHandler}>

          {/* Email label. */}
          <label htmlFor='email'>
            Email
            <FaCheck className={validEmail ? 'valid' : 'hide'} />
            <FaTimes className={validEmail || !email ? 'hide' : 'invalid'} />
          </label>

          {/* Email input and validation message. */}
          <input
            id='email'
            type='text'
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby='emailnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
               <FaInfoCircle />
               Email should be valid.
          </p>

          {/* Username label. */}
          <label htmlFor='username'>
            Username
            <FaCheck className={validUsername ? 'valid' : 'hide'} />
            <FaTimes className={validUsername || !username ? 'hide' : 'invalid'} />
          </label>

          {/* Username input and validation message. */}
          <input 
            id='username'
            type='text'
            autoComplete='off'
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            required
            aria-invalid={validUsername ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />
          <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
               <FaInfoCircle />
               5 to 28 characters.<br />
               Must begin with a letter.<br />
               Letters, numbers, underscores, hyphens allowed.
          </p>

          {/* Password label. */}
          <label htmlFor='password'>
            Password
            <FaCheck className={validPwd ? 'valid' : 'hide'} />
            <FaTimes className={validPwd || !pwd ? 'hide' : 'invalid'} />
          </label>
          
          {/* Password input and validation message. */}
          <input 
            id='password' 
            type='password' 
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <FaInfoCircle />
            8 to 32 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>

          {/* Confirm password label. */}
          <label htmlFor='confirmPassword'>
            Confirm password
            <FaCheck className={validMatch && confirmPwd ? 'valid' : 'hide'} />
            <FaTimes className={validMatch || !confirmPwd ? 'hide' : 'invalid'} />
            </label>

          {/* Confirm password input and validation message. */}
          <input 
            id='confirmPassword' 
            type='password' 
            onChange={(e) => setConfirmPwd(e.target.value)}
            value={confirmPwd} 
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setConfirmPwdFocus(true)}
            onBlur={() => setConfirmPwdFocus(false)}
          />
          <p id="confirmnote" className={confirmPwdFocus && !validMatch ? "instructions" : "offscreen"}>
            <FaInfoCircle />
            Must match the password.
          </p>

          {/* Submit button. */}
          <br/>
          <input type='submit' disabled={!validEmail || !validUsername || !validPwd || !validMatch ? true : false} value={'Register'} />
        </form>
      </section>
    </>
  )
}

export default Register