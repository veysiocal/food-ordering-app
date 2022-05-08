import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import classes from './MainHeader.module.css';


const AdminMainHeader = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout())
    history.replace('/auth')
  };

  return (
    <header className={classes.headerCustom}>
      <NavLink to='/admin'>
        <h1>Ana Sayfa</h1>
      </NavLink>
      <nav className={classes.navCustom}>
        <ul>
          {/* <li>
            <NavLink to='/restaurants' activeClassName={classes.active}>Satış</NavLink>
          </li> */}
          <li>
            <NavLink to='/admin/active-products' activeClassName={classes.active}>Satıştaki Ürünler</NavLink>
          </li>
          <li>
            <NavLink to='/admin/my-products' activeClassName={classes.active}>Ürünler</NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-product' activeClassName={classes.active} >Yeni Ürün Ekle</NavLink>
          </li>
          <li>
            <NavLink to='/admin/orders' activeClassName={classes.active}>Siparişleri Gör</NavLink>
          </li>
          <li>
            <button onClick={logoutHandler} > Çıkış Yap </button>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default AdminMainHeader;
