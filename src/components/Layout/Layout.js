import { Fragment } from 'react';
import MainHeader from './MainHeader';
import Sidebar from './SideBar';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment >
      <MainHeader />
      <div className={classes.containerLayout}>
        <Sidebar />
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
