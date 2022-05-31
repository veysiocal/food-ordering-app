import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http';
import { useSelector } from 'react-redux';
import ErrorModal from '../../components/UI/ErrorModal';
import Card from '../../components/UI/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ProductItem from '../../components/Shop/ProductItem';

import classes from './HomePage.module.css';

const Products = () => {
    const [businessProducts, setBusinessProducts] = useState([{}]);
    const [isLoading, haveError, sendRequest, clearError] = useHttp();

    const businessId = useSelector(state => state.auth.businessId);
    let businessTypeId;
    useEffect(() => {
        const fetchRestaurantById = async () => {
            try {
                const data = await sendRequest(`http://localhost:8080/api/views/products-page?businessId=${businessId}`)
                console.log("DATA: ", data);
                if (data && data.success) {
                    setBusinessProducts(data.data);
                }
                businessTypeId = data.data.businessTypeId;
            } catch (error) {
                console.log("Error: ", error)
            }
        }
        fetchRestaurantById();
    }, [sendRequest]);

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

    return (
        <React.Fragment>
            {haveError && <ErrorModal error={haveError} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <section className={classes.itemCustom}>
                <div className={classes.container} >
                    <div className={classes[category]} />
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
                        <p>{businessProducts[0].address}</p>
                        <span>({businessProducts[0].companyPhone}) </span>
                        <p>{businessProducts[0].owner}</p>
                    </div>
                </div>
                <div >
                    <ul className={classes.productItemsList}>
                        {businessProducts.map(product => (
                            <ProductItem key={product.productId} display='none' id={product.productId} name={product.title} fee={product.price}
                                description={product.description} start={product.startTime} end={product.endTime} amount={product.amount} />)
                        )}
                    </ul>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Products;
