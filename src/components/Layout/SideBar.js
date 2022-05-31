import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { uiActions } from '../../store/ui-slice';

import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorModal from '../UI/ErrorModal';

import classes from './SideBar.module.css';
import { useHttp } from '../../hooks/use-http';
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
    const [isLoading, haveError, sendRequest, clearError] = useHttp();
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await sendRequest('http://localhost:8080/api/categories');
                if (data && data.success === true) {
                    setCategories(data.data);
                }

            } catch {

            }
        };
        fetchCategories();
    }, [sendRequest]);

    const checkSelectedCategories = useSelector(state => state.ui.selectedCategories);
    const dispatch = useDispatch();

    const categoryHandler = (e) => {
        const category = categories.find(category => category.categoryId === +e.target.id);
        dispatch(uiActions.addToSelectedCategories(category));
    };

    let selectedCategories = useSelector(state => state.ui.selectedCategories);

    const removeCategoryHandler = (e) => {
        const id = e.target.id
        dispatch(uiActions.removeSelectedCategory(id))
    };

    const cleanAllHandler = () => {
        dispatch(uiActions.cleanSelectedCategories())
    };


    if (!haveError && categories.length === 0) {
        return (
            <div className={classes.categories}>
                <h2>Categoriler bulunamadı...</h2>
            </div>
        )
    }

    const clearAndTryAgain = () => {
        clearError();
        history.go(0)
    }
    
    return (
        <div className={classes.categories}>
            {haveError && <ErrorModal error={haveError} onClear={clearAndTryAgain} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <h3 >Kategoriler</h3>
            <ul className={classes.categoriesList}>
                {categories.map(category => <li key={category.categoryId}>
                    <button onClick={categoryHandler} id={category.categoryId} >
                        {category.categoryName}
                    </button>
                </li>)}

            </ul>
            <ul className={classes.selectCategoriesList}>
                {selectedCategories.length !== 0 && <div>
                    <label>Seçilen Kategoriler</label>
                    {selectedCategories.map(category => <li key={category.categoryId}>
                        <div className={classes.closeButtonDiv}>
                            <span for='closeButton'> {category.categoryName}</span>
                            <Button close id={category.id} onClick={removeCategoryHandler} className={classes.closeButton} />
                        </div>
                    </li>

                    )}
                </div>}
            </ul>
            <div className={classes.cleanButton}>
                {checkSelectedCategories.length !== 0 &&
                    <button onClick={cleanAllHandler}>Seçilenleri Sıfırla</button>
                }
            </div>
        </div>
    )
};

export default Sidebar;