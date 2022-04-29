import RestaurantItem from './RestaurantItem';
import classes from './Restaurants.module.css';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { useHttp } from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';


const Restaurants = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filteredRestaurant = queryParams.get('filt');
  const [isLoading, haveError, sendRequest] = useHttp();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await sendRequest('http://localhost:8080/api/admin/businessInfos');
        if (data && data.success === true) {
          setRestaurants(data.data)
        }
      } catch {

      }
    }
    fetchRestaurants();
  }, [sendRequest])

  let showRestaurants = [];
  if (filteredRestaurant) {
    showRestaurants = restaurants.filter(restaurant => restaurant.title.includes(filteredRestaurant));
  } else {
    showRestaurants = restaurants;
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
  const categorized = selectedCategories.map(category => showRestaurants.filter(restaurant => restaurant.category.includes(category.categoryName)));

  let result = [];
  categorized.map(category => category.map(category => result.push(category)));

  if (selectedCategories.length !== 0) {
    showRestaurants = result
  };

  const selectDistrictHandler = (e) => {
    const district = e.target.value;
    dispatch(uiActions.takeSelectedDistrict(district));
  };

  const selectedDistrict = useSelector(state => state.ui.selectedDistrict);
  if (selectedDistrict !== null) {
    if (selectedDistrict === 'Tümü') {
      showRestaurants = showRestaurants;
    } else {
      showRestaurants = showRestaurants.filter(restaurant => restaurant.district === selectedDistrict)
    }
  }
console.log("isloading: ",isLoading);
  if (isLoading) {
    return (
      <LoadingSpinner asOverlay />
    )
  }
console.log("isloading2: ",isLoading);

  return (
    <section className={classes.itemCustom}>
      <div className={classes.selectorDiv}>
        <select id='districtselect' className={classes.selector} placeholder='Seçim Yapınız' onChange={selectDistrictHandler}>
          <option value='Tümü' >Bölge Seçiniz</option>
          <option value='Kadıköy' >Kadıköy</option>
          <option value='Kartal' >Kartal</option>
          <option value='Maltepe' >Maltepe</option>
          <option value='Pendik' >Pendik</option>
          <option value='Üsküdar' >Üsküdar</option>
          <option value='Ümraniye' >Ümraniye</option>
        </select>
      </div>
      <div className={classes.filtering} >
        <input onChange={enteredRestaurantHandler} value={enteredRestaurant} placeholder='Restoran ara...'></input>
        <div>
          <button onClick={filteringRestaurant} className={classes.filterButton}><i class="fas fa-search"></i>
          </button>
          <button onClick={cleanHandler} className={classes.filterButton}>Temizle</button>
        </div>

      </div>
      {
        showRestaurants.length !== 0 && <ul>
          {showRestaurants.map(restaurant => (
            <RestaurantItem key={restaurant.businessId} id={restaurant.businessId} favorited={false} businessTypeId={restaurant.businessTypeId}
              title={restaurant.companyName}
              // description={restaurant.description} 
              district={restaurant.district}
              start={restaurant.start} end={restaurant.end} />)
          )}
        </ul>
      }
      {showRestaurants.length === 0 && <div className={classes.cautionDiv}>Uygun restoran bulunamadı...</div>}

    </section>
  );
};

export default Restaurants;
