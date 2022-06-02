import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import ProductItem from './ProductItem';
import Map from '../UI/Map';

import classes from './Products.module.css';

const Products = () => {
  const [businessProducts, setBusinessProducts] = useState([{}]);
  const [isLoading, haveError, sendRequest, clearError] = useHttp();
  const [showMap, setShowMap] = useState(false);

  const [businessTypeId, setBusinessTypeId] = useState('');
  // let businessTypeId;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('businessId');

  useEffect(() => {
    const fetchRestaurantById = async () => {
      try {
        const data = await sendRequest(`http://localhost:8080/api/views/products-page?businessId=${businessId}`)
        console.log("DATA: ", data);
        setBusinessTypeId(data.data[0].businessTypeId);

        if (data && data.success) {
          setBusinessProducts(data.data);
        }
      } catch (error) {
        console.log("Error: ", error)
      }
    }
    fetchRestaurantById();
  }, [sendRequest]);

  let categoryName = "";
  switch (businessTypeId) {
    case 1:
      categoryName = "Restoran";
      break;
    case 2:
      categoryName = "Pastane";
      break;
    case 3:
      categoryName = "Fırın";
      break;
    case 4:
      categoryName = "Kafe";
      break;
    case 5:
      categoryName = "Manav";
      break;
    default: categoryName = "Restoran";
  }

  console.log("busşness: ", businessProducts);

  const showMapHandler = () => {
    setShowMap(true);
  }
 const closeMap = () => {
   setShowMap(false);
 }
  return (
    <React.Fragment>
      {haveError && <ErrorModal error={haveError} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {showMap && <Modal header={<button onClick={closeMap} className={classes.modal_cancel}>KAPAT</button>}>
        <div className={classes.mapContainer}>
          <Map center={{
            lat: businessProducts[0].latitude,   //google mapsden alunacak latitude @ işaretinden sonra gelen sayı
            lng: businessProducts[0].longitude,   //longitude lat'dan sonra gelen sayı.
          }} zoom={16} />
        </div>
      </Modal>}
      <section className={classes.productsCustom}>
        <div className={classes.container} >
          <div className={classes[categoryName]} />
          <Card className={classes.containerCustom}>
            <header>
              <h4>{businessProducts[0].companyName}</h4>
              <h5>{businessProducts[0].district}</h5>
            </header>
            <p>
              {/* {businessProducts[0].description} */}
              {businessProducts[0].start} - {businessProducts[0].end}
            </p>
          </Card>
          <div className={classes.detailsInfo}>
            <p>{businessProducts[0].address1}</p>
            <span>({businessProducts[0].companyPhone}) </span>
            <p>{businessProducts[0].owner}</p>
            <button className={classes.mapButton} onClick={showMapHandler}>Haritada Gör</button>
          </div>
        </div>
        <div >
          <ul className={classes.productItemsList}>
            {businessProducts.map(product => (
              <ProductItem key={product.productId} id={product.productId} name={product.title} fee={product.price}
                description={product.description} start={product.startTime} end={product.endTime} amount={product.amount} businessId={businessProducts[0].businessId} businessName={businessProducts[0].companyName} 
                latitude={businessProducts[0].latitude} longitude= {businessProducts[0].longitude}
                />)
            )}
          </ul>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Products;
