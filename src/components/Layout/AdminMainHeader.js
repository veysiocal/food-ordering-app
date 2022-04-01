import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css';


const AdminMainHeader = (props) => {
  const isLoggedIn =  useSelector(state => state.auth.isLoggedIn);
  
  return (
    <header className={classes.headerCustom}>
      <NavLink to='/admin'>
        <h1>Ana Sayfa</h1>
      </NavLink>
      <nav className={classes.navCustom}>
        <ul>
        <li>
            <NavLink to='/restaurants' activeClassName={classes.active}>Satış</NavLink>
          </li>
          <li>
            <NavLink to='/admin/active-products' activeClassName={classes.active}>Aktif Ürünler</NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-product' activeClassName={classes.active} >Ürün Ekle</NavLink>
          </li>
          <li>
            <NavLink to='/admin/orders' activeClassName={classes.active}>Siparişleri Gör</NavLink>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default AdminMainHeader;
