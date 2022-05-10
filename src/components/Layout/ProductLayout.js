import { Fragment } from 'react';
import MainHeader from './MainHeader';

import classes from './ProductLayout.module.css';

const ProductLayout = (props) => {
  return (
    <Fragment >
      <MainHeader />
      <div className={classes.containerLayout}>
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default ProductLayout;
