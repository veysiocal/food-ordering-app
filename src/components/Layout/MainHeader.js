import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';


const MainHeader = (props) => {
  const isLoggedIn =  useSelector(state => state.auth.isLoggedIn);
  const loggedName = useSelector(state => state.auth.name);

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
          <li>
            <NavLink to='/restaurants' activeClassName={classes.active} >Ana Sayfa</NavLink>
          </li>
          {isLoggedIn && (<li>
            <NavLink to='/favorite-restaurants' activeClassName={classes.active}>Favori Restoranlar</NavLink>
          </li>)}
          {isLoggedIn && (<li>
            <NavLink to='/my-orders' activeClassName={classes.active}>Siparişlerim</NavLink>
          </li>)}
          {isLoggedIn && (<li>
            <CartButton />
          </li>)}
            {!isLoggedIn && (<li>
              <NavLink to='/auth' activeClassName={classes.active}>Giriş Yap</NavLink>
            </li>)}
            {!isLoggedIn && (<li>
              <NavLink to='/auth' activeClassName={classes.active} style={{opacity: '0.8'}}>Üye Ol</NavLink>
            </li>)}
            {isLoggedIn && (<li>
              <button onClick={logoutHandler} > {loggedName} --  Logout</button>
            </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
