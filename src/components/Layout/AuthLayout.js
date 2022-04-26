import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './AuthLayout.module.css';

const AuthLayout = (props) => {
  return (
    <Fragment >
      <header className={classes.authHeader}>
        <nav className={classes.homeLink}>
        <NavLink to='/restaurants'>
          Ana Sayfa
        </NavLink>
        </nav>
        <h1>Restoran Sipariş Uygulaması</h1>
        <h3>Hoşgeldiniz...</h3>
      </header>
      <div className={classes.containerLayout}>
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default AuthLayout;
