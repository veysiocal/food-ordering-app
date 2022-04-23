import { useContext, useState } from 'react';

import classes from './Login.module.css';

// import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth-slice';
import Input from '../../components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../components/Helpers/validators';
import { useForm } from '../../hooks/use-form';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorModal from '../../components/UI/ErrorModal';

const AuthForm = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [haveError, setHaveError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const switchAuthModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false,
        }
      }, false)
    }
    setIsLoginMode((prevState) => !prevState);
  };

  const submitHandler = async event => {
    event.preventDefault();

    console.log("formState: ", formState);
    // optional: Add validation.

    // setIsLoading(true);
    const userName = formState.inputs.email.value;
    const password = formState.inputs.password.value;
    const name = formState.inputs.name ? formState.inputs.name.value : '';
    let data;
    if (isLoginMode) {
      try {
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
        data = await response.json();
        if(!response.ok) {
          throw new Error(data.message)
        } 
        if (data.success === true) {
          dispatch(authActions.login(data.name));
          history.replace('/restaurants');
        }
        //  else {
        //   alert("Başarısız deneme")
        // }
      } catch (err){
        console.log("err: ",err);
      }
    } else {
      try {
        console.log("???")
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName,
            password,
            name,
          }),
        });
        data = await response.json();
        if(!response.ok) {
          throw new Error(data.message)
        } 
        if (data.success === true) {
          dispatch(authActions.login(data.name));
          history.replace('/restaurants');
        }
        //  else {
          // alert("Başarısız deneme")
        // }
      } catch (err) {
        console.log("err: ", err.message);
        setHaveError(err.message || 'Something went wrong')
      }

    }
    setIsLoading(false);

    if (haveError) {
      return (
        <h2>Error: {haveError}</h2>
      )
    }
    if (!data) {
      alert('Giriş bilgileriniz kontrol ediniz!');
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
      {isLoading && <LoadingSpinner asOverlay />}
      <h1>{isLoginMode ? 'Giriş Yap' : 'Üye Ol'}</h1>
      <hr />
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          {/* <label htmlFor='username'>Your Email</label>
          <input type='username' id='username' required onChange={(e) => setUserName(e.target.value)} /> */}
          <Input
            inputOrText='input'
            type='email'
            id='email'
            label='E-mail'
            errorText='Lütfen geçerli bir mail adresini giriniz.'
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
        </div>
        <div className={classes.control}>
          {/* <label htmlFor='password'>Your Password</label> */}
          {/* <input type='password' id='password' required onChange={(e) => setPassword(e.target.value)} /> */}
          <Input
            inputOrText='input'
            type='password'
            id='password'
            label='Şifre'
            errorText='Parolanız en az 6 karakterden oluşmalı!'
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
          />
        </div>
        {!isLoginMode && <div className={classes.control}>
          {/* <label htmlFor='password'>Your Password</label> */}
          {/* <input type='password' id='password' required onChange={(e) => setPassword(e.target.value)} /> */}
          <Input
            inputOrText='input'
            type='name'
            id='name'
            label='İsim'
            errorText='Lütfen isminizi giriniz.'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>}
        <div className={classes.actions}>
          {/* {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>} */}
          {<button disabled={!formState.isValid}>{isLoginMode ? 'Giriş Yap' : 'Üye Ol'}</button>}
          {/* {isLoading && <p>Sending request...</p>} */}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLoginMode ? 'Hesabınız yok mu?' : 'Var olan hesapla giriş yap...'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
