import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = () => {
  const [isLoading, haveError, sendRequest, clearError] = useHttp();
  const [restaurant, setRestaurant] = useState({});

  const params = useParams();

  let businessTypeId;

  useEffect(() => {
    const fetchRestaurantById = async () => {
      try {
        const data = await sendRequest(`http://localhost:8080/api/admin/businessInfos/${params.businessId}`)
        if (data && data.success) {
          setRestaurant(data.data);
        }
        businessTypeId = data.data.businessTypeId;

      } catch {

      }
    }
    fetchRestaurantById();
  }, [sendRequest]);

  const activeProducts = useSelector(state => state.admin.activeProducts);
  console.log("activePRODUCTS: ",activeProducts)
  
  const products = activeProducts.filter(restaurant => restaurant.restaurantId === +params.businessId);
  console.log("PRODUCTS: ",products)

  let category = "";
  switch (businessTypeId) {
    case 1:
      category = "Restoran";
      break;
    case 2:
      category = "Pastane";
      break;
    case 3:
      category = "Fırın";
      break;
    case 4:
      category = "Kafe";
      break;
    case 5:
      category = "Manav";
      break;
    default: category = "Restoran";
  }

  if (isLoading) {
    return (
      <LoadingSpinner asOverlay />
    )
  }

  console.log("restaurant22: ", restaurant)
  return (
    <section className={classes.productsCustom}>
      <div className={classes.container} >
        <div className={classes[category]} />
        <Card className={classes.containerCustom}>
          <header>
            <h4>{restaurant.companyName}</h4>
            <h5>{restaurant.district}</h5>
          </header>
          <p>
            {/* {restaurant[0].description} */}
            {restaurant.start} - {restaurant.end}
          </p>
        </Card>
        <div className={classes.detailsInfo}>
          <p>{restaurant.address}</p>
          <span>({restaurant.companyPhone}) </span>
          <p>{restaurant.owner}</p>
        </div>
      </div>
      <div >
        <ul className={classes.productItemsList}>
          {products.map(product => (
            <ProductItem key={product.id} id={product.id} name={product.name} fee={product.price}
              description={product.description} start={product.start} end={product.end} amount={product.amount} />)
          )}
        </ul>
      </div>
    </section>
  );
};

export default Products;
