import { Link, NavLink } from 'react-router-dom';
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';


const MainHeader = (props) => {
  return (
    <header className={classes.headerCustom}>
      <NavLink to='/restaurants'>
        <h1> Artık Yemek Uygulaması</h1>
      </NavLink>
      <nav className={classes.navCustom}>
        <ul>
          <li>
            <NavLink to='/admin' activeClassName={classes.active} >Admin</NavLink>
          </li>
          <li>
            <NavLink to='/restaurants' activeClassName={classes.active} >Ana Sayfa</NavLink>
          </li>
          <li>
            <NavLink to='/favorite-restaurants' activeClassName={classes.active}>Favori Restoranlar</NavLink>
          </li>
          <li>
            <CartButton />
          </li>
            <li>
              <NavLink to='/auth' activeClassName={classes.active}>Giriş Yap</NavLink>
            </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
