import RestaurantItem from './RestaurantItem';
import classes from './Restaurants.module.css';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { useHttp } from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import Option from '../FormElements/Option';


const Restaurants = (props) => {
  const [isLoading, haveError, sendRequest] = useHttp();
  const [restaurants, setRestaurants] = useState([]);
  const [optionValues, setOptionValues] = useState([]);
  const [enteredRestaurant, setEnteredRestaurant] = useState('');
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filteredRestaurant = queryParams.get('filt');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await sendRequest('http://localhost:8080/api/views/business-with-category-name');
        if (data && data.success === true) {
          setRestaurants(data.data)
        }
        const districtsData = await sendRequest('http://localhost:8080/api/districts');
        if (districtsData && districtsData.success === true) {
          setOptionValues(districtsData.data)
        }
      } catch {

      }
    }
    fetchRestaurants();
  }, [sendRequest])

  let showRestaurants = [];
  if (filteredRestaurant) {
    showRestaurants = restaurants.filter(restaurant => restaurant.companyName.includes(filteredRestaurant));
  } else {
    showRestaurants = restaurants;
  }


  const enteredRestaurantHandler = (e) => {
    setEnteredRestaurant(e.target.value);
  }

  const history = useHistory();

  const filteringRestaurant = () => {
    history.push(`/restaurants?filt=${enteredRestaurant}`);
  };

  const cleanHandler = () => {
    dispatch(uiActions.cleanSelectedCategories());
    history.push('/restaurants');
    setEnteredRestaurant('');
  };

  const selectedCategories = useSelector(state => state.ui.selectedCategories);
  const categorized = selectedCategories.map(category => showRestaurants.filter(restaurant => restaurant.categoryName.includes(category.categoryName)));

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
  if (isLoading) {
    return (
      <LoadingSpinner asOverlay />
    )
  }

  return (
    <section className={classes.itemCustom}>
      <div className={classes.selectorDiv}>
        <select id='districtselect' className={classes.selector} placeholder='Seçim Yapınız' onChange={selectDistrictHandler}>
          <option value='Tümü' >Bölge Seçiniz</option>
          {optionValues.map(district => (
            <Option value={district.districtName} eventHandler={selectDistrictHandler}/>
          ))}

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

    </section >
  );
};

export default Restaurants;
