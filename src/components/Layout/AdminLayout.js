import { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MainHeader from './MainHeader';
import Sidebar from './SideBar';

import classes from './AdminLayout.module.css';
import AdminMainHeader from './AdminMainHeader';

const AdminLayout = (props) => {
  return (
    <Fragment >
      <AdminMainHeader />
      <div className={classes.containerLayout}>
        <Row>
          {/* <Col xs="3"> */}
            {/* <Sidebar /> */}
          {/* </Col> */}
          <Col>
            <main>{props.children}</main>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AdminLayout;
