import { useContext, useState } from 'react';

import classes from './Login.module.css';

// import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

//   const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = event => {
    event.preventDefault();

    // optional: Add validation.

    setIsLoading(true);

    // let url;
    // if (isLogin) {
    //   url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY5d0Ve3zl6-TxonlPFfgYBA-kjO6k8FI'
    // } else {
    //   url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY5d0Ve3zl6-TxonlPFfgYBA-kjO6k8FI'
    // }
    // fetch(url,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email: emailInput,
    //       password: passwordInput,
    //       returnSecureToken: true,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //   }).then(res => {
    //     setIsLoading(false);

    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then(data => {
    //         let errorMessage = 'Authentication failed!';
    //         if (data && data.error && data.error.message) {
    //           errorMessage = data.error.message;
    //         }
    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then(data => {
    //     console.log(data);
    //     const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
    //     authCtx.login(data.idToken, expirationTime.toISOString()); // calculateRemainingTime fonksiyonunda expirationTime
    //                                                     // string olarak kabul edip işlenm yaptığımızdan, burada parametreye string olarak veriyoruz.
    //     history.replace('/');
    //   })
    //   .catch(err => {
    //     alert(err.message)
    //   });
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required onChange={(e) => setEmailInput(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required onChange={(e) => setPasswordInput(e.target.value)} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
