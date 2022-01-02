import { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
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
