import { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MainHeader from './MainHeader';
import Sidebar from './SideBar';

import classes from './Layout.module.css';
import AdminMainHeader from './AdminMainHeader';

const AdminLayout = (props) => {
  return (
    <Fragment >
      <AdminMainHeader />
      <Container className={classes.containerCustom}>
        <Row>
          {/* <Col xs="3"> */}
            {/* <Sidebar /> */}
          {/* </Col> */}
          <Col>
            <main>{props.children}</main>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AdminLayout;
