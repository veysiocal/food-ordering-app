import RestaurantItem from './RestaurantItem';
import classes from './Restaurants.module.css';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const DUMMY_RESTAURANTS = [
  {
    id: 'restaurant1',
    title: 'Veysi Restaurant',
    description: 'Kebap & Lahmacun',
    district: 'Maltepe',
    category: 'Kebap',
  },
  {
    id: 'restaurant2',
    title: 'Salih Restaurant',
    description: 'Kebap & Patates',
    district: 'Üsküdar',
    category: 'Kebap',
  },
  {
    id: 'restaurant3',
    title: 'Ömer Restaurant',
    description: 'Döner & Litle Litle in the Middle',
    district: 'Ümraniye',
    category: 'Döner',
  },
  {
    id: 'restaurant4',
    title: 'Ömrestaurant4',
    description: 'Sulu &Litle Litle in the Middle',
    district: 'Ataşehir',
    category: 'Sulu',
  },
  {
    id: 'restaurant5',
    title: 'Restaurant5',
    description: 'Burger & Litle Litle in the Middle',
    district: 'Bostancı',
    category: 'Burger',
  },
  {
    id: 'restaurant6',
    title: 'Restaurant6',
    description: 'Pizza & Litle Litle in the Middle',
    district: 'Kadıköy',
    category: 'Pizza',
  },
];


const Restaurants = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filteredRestaurant = queryParams.get('filt');

  let restaurants = [];
  if (filteredRestaurant) {
    restaurants = DUMMY_RESTAURANTS.filter(restaurant => restaurant.title.includes(filteredRestaurant));
  } else {
    restaurants = DUMMY_RESTAURANTS;
  }

  const [enteredRestaurant, setEnteredRestaurant] = useState('');

  const enteredRestaurantHandler = (e) => {
    setEnteredRestaurant(e.target.value);
  }

  const history = useHistory();

  const filteringRestaurant = () => {
    history.push(`/restaurants?filt=${enteredRestaurant}`);
  };

  const dispatch = useDispatch();
  const cleanHandler = () => {
    dispatch(uiActions.cleanSelectedCategories());
    history.push('/restaurants');
    setEnteredRestaurant('');
  };

  const selectedCategories = useSelector(state => state.ui.selectedCategories);
  const categorized = selectedCategories.map(category => restaurants.filter(restaurant => restaurant.category.includes(category.categoryName)));

  let result = [];
  categorized.map(category => category.map(category => result.push(category)));

  if (selectedCategories.length !== 0) {
    restaurants = result
  };
  return (
    <section className={classes.itemCustom}>
      <div className='centeredCustom' >
        <label>Filter</label>
        <input onChange={enteredRestaurantHandler} value={enteredRestaurant} placeholder='Search restaurant...'></input>
        <button onClick={filteringRestaurant} className={classes.filterButton}><i class="fas fa-search"></i>
        </button>
        <button onClick={cleanHandler} className={classes.filterButton}>Clean</button>
      </div>

      <ul>
        {restaurants.map(restaurant => (
          <RestaurantItem key={restaurant.id} id={restaurant.id} favorited={false} title={restaurant.title} description={restaurant.description} district={restaurant.district} />)
        )}
      </ul>
    </section>
  );
};

export default Restaurants;
