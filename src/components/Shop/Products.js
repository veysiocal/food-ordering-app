import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../UI/Card';
import ProductItem from './ProductItem';
import classes from './Products.module.css';




const Products = () => {
  const params = useParams();

  const restaurants = useSelector(state => state.admin.restaurants)
  const activeProducts = useSelector(state => state.admin.activeProducts);

  const restaurant = restaurants.find(restaurant => restaurant.id === params.restaurantId)
  const products = activeProducts.filter(restaurant => restaurant.restaurantId === params.restaurantId);

  return (
    <section className={classes.productsCustom}>
      <div className={classes.container} >
      <div className={classes[restaurant.category]} />

        <Card className={classes.containerCustom}>
          <header>
            <h4>{restaurant.title}</h4>
            <h5>{restaurant.district}</h5>
          </header>
          <p>
            {restaurant.description}
            {restaurant.start} - {restaurant.end}
          </p>
        </Card>
      </div>
      <div >
        <ul className={classes.productItemsList}>
          {products.map(product => (
            <ProductItem key={product.id} id={product.id} name={product.name} fee={product.price}
            description={product.description} start={product.start} end={product.end} amount={product.amount}/>)
          )}
        </ul>
      </div>
    </section>
  );
};

export default Products;
