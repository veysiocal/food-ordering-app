import { Fragment } from 'react';

import classes from './AuthLayout.module.css';

const AuthLayout = (props) => {
  return (
    <Fragment >
        <header className={classes.authHeader}>
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
