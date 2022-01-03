import { Fragment } from 'react';
import MainHeader from './MainHeader';

import classes from './ProductLayout.module.css';

const Layout = (props) => {
  return (
    <Fragment >
      <MainHeader />
      <div className={classes.containerLayout}>
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
