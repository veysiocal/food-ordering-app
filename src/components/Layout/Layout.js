import { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MainHeader from './MainHeader';
import Sidebar from './SideBar';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment >
      <MainHeader/>
      <Container className={classes.containerCustom}>
        <Row>
          <Col xs="3">
            <Sidebar />
          </Col>
          <Col xs="9">
            <main>{props.children}</main>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Layout;
