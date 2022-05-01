import React, { useContext, useEffect, useState } from 'react';

import classes from './Login.module.css';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth-slice';
import Input from '../../components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../components/Helpers/validators';
import { useForm } from '../../hooks/use-form';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorModal from '../../components/UI/ErrorModal';
import Card from '../../components/UI/Card';
import { useHttp } from '../../hooks/use-http';

const AuthForm = (props) => {
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [isLoading, haveError, sendRequest, clearError] = useHttp();

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

    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;
    const name = formState.inputs.name ? formState.inputs.name.value : '';
    if (isLoginMode) {
      console.log("login!!!")
      const data = await sendRequest(
        'http://localhost:8080/api/auth/login',
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          userName: email,
          password,
        }),
      );
      console.log("LOGINDATA: ",data)
      if (data && data.success === true) {
        dispatch(authActions.login(data));
        // history.replace('/restaurants');
      }
    } else {
      console.log("Register!!!")
      const data = await sendRequest('http://localhost:8080/api/auth/register',
        'POST',
        {
          'Content-Type': 'application/json'
        },
        JSON.stringify({
          userName: email,
          password,
          name,
        }),
      );
      if (data && data.success === true) {
        dispatch(authActions.login(data));
        history.replace('/restaurants');
      }
    }
  };

  const tryAgainHandler = () => {
    history.go(0);
  }

  if (haveError) {
    return (
      <React.Fragment>
        <h2 style={{ 'margin-top': '100px' }}>Error: {haveError}</h2>
        <button onClick={tryAgainHandler}>Tekrar Dene</button>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {/* <ErrorModal error={haveError} onClear={clearError} /> */}
      <Card className={classes.auth}>
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
      </Card>
    </React.Fragment>
  );
};

export default AuthForm;
