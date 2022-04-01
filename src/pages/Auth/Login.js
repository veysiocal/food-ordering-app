import { useContext, useState } from 'react';

import classes from './Login.module.css';

// import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const AuthForm = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  //   const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async event => {
    event.preventDefault();

    // optional: Add validation.

    // setIsLoading(true);
    


    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await response.json();
    console.log("DATA: ",data);
    if (!data) {
      alert('Giriş bilgileriniz kontrol ediniz!');
    }
    if (data.success === true) {
      dispatch(authActions.login()); 
      history.replace('/restaurants');
    } else {
      alert("Başarısız deneme")
    }


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
        <label htmlFor='username'>Your Email</label>
        <input type='username' id='username' required onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Your Password</label>
        <input type='password' id='password' required onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={classes.actions}>
        {/* {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>} */}
        {<button>{isLogin ? 'Login' : 'Create Account'}</button>}
        {/* {isLoading && <p>Sending request...</p>} */}
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
