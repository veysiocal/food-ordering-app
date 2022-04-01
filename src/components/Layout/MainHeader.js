import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';


const MainHeader = (props) => {
  const isLoggedIn =  useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout())
  };


  return (
    <header className={classes.headerCustom}>
      <NavLink to='/restaurants'>
        <h1> Artık Yemek Uygulaması</h1>
      </NavLink>
      <nav className={classes.navCustom}>
        <ul>
          {isLoggedIn && (<li>
            <NavLink to='/admin' activeClassName={classes.active} >Admin</NavLink>
          </li>)}
          <li>
            <NavLink to='/restaurants' activeClassName={classes.active} >Ana Sayfa</NavLink>
          </li>
          {isLoggedIn && (<li>
            <NavLink to='/favorite-restaurants' activeClassName={classes.active}>Favori Restoranlar</NavLink>
          </li>)}
          {isLoggedIn && (<li>
            <CartButton />
          </li>)}
            {!isLoggedIn && (<li>
              <NavLink to='/auth' activeClassName={classes.active}>Giriş Yap</NavLink>
            </li>)}
            {isLoggedIn && (<li>
              <button onClick={logoutHandler} >Logout</button>
            </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
