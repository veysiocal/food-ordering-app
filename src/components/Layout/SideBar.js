import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Button } from 'reactstrap';
import { uiActions } from '../../store/ui-slice';

import classes from './SideBar.module.css';

let categories = [
    { id: '1', categoryName: 'Restoran' },
    { id: '2', categoryName: 'Pastane' },
    { id: '3', categoryName: 'Fırın' },
    { id: '4', categoryName: 'Kafe' },
    { id: '5', categoryName: 'Manav' },
];

const Sidebar = () => {
    const checkSelectedCategories = useSelector(state => state.ui.selectedCategories);
    console.log(checkSelectedCategories)
    const dispatch = useDispatch();

    const categoryHandler = (e) => {
        const category = categories.find(category => category.id === e.target.id);
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

    return (
        <div className={classes.categories}>
            <h3 >Kategoriler</h3>
            <ul className={classes.categoriesList}>
                {categories.map(category => <li key={category.id}>
                    <button onClick={categoryHandler} id={category.id} >
                        {category.categoryName}
                    </button>
                </li>)}

            </ul>
            <ul className={classes.selectCategoriesList}>
                {selectedCategories.length !== 0 && <div>
                    <label>Seçilen Kategoriler</label>
                    {selectedCategories.map(category => <li key={category.id}>
                        <div className={classes.closeButtonDiv}>
                            <span for='closeButton'> {category.categoryName} </span>
                            <Button close id='closeButton ' onClick={removeCategoryHandler} id={category.id} className={classes.closeButton} />
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