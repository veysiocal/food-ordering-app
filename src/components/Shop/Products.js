import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = () => {
  const params = useParams();

  const activeProducts = useSelector(state => state.admin.activeProducts);

  const [isLoading, haveError, sendRequest] = useHttp();
  const [restaurant, setRestaurant] = useState();
  let businessTypeId;

  useEffect(() => {
    console.log("praösa:sasas")
    const fetchRestaurantById = async () => {
      try {
      const data = await sendRequest( `http://localhost:8080/api/admin/businessInfos/${params.businessId}`)
      if (data && data.success) {
        setRestaurant(data.data);
      }
      businessTypeId = data.data.businessTypeId;

    } catch {

    }
    }
    fetchRestaurantById();
  }, [sendRequest]);
  const products = activeProducts.filter(restaurant => restaurant.businessId === params.businessId);

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
console.log("isloading: ",isLoading);

  if (isLoading) {
    return (
      <LoadingSpinner asOverlay />
    )
  }
console.log("isloading2: ",isLoading);

  console.log("restaurant22: ",restaurant)
  return (
    <section className={classes.productsCustom}>
      <div className={classes.container} >
        <div className={classes[category]} />
        <Card className={classes.containerCustom}>
          <header>
            <h4>{restaurant[0].companyName}</h4>
            <h5>{restaurant[0].district}</h5>
          </header>
          <p>
            {/* {restaurant[0].description} */}
            {restaurant[0].start} - {restaurant[0].end}
          </p>
        </Card>
        <div className={classes.detailsInfo}>
          <p>{restaurant[0].address}</p>
          <span>({restaurant[0].phone}) </span>
          <p>{restaurant[0].email}</p>
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
