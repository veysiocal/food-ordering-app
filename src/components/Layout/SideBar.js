import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { uiActions } from '../../store/ui-slice';

import classes from './SideBar.module.css';

let categories = [
    { id: '1', categoryName: 'Kebap' },
    { id: '2', categoryName: 'Pizza' },
    { id: '3', categoryName: 'Döner' },
    { id: '4', categoryName: 'Sulu' },
    { id: '5', categoryName: 'Burger' },
];

const Sidebar = () => {
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

    return (
        <React.Fragment>
            <h3 className={classes.h3}>CATEGORIES</h3>
            <ListGroup>
                {categories.map(category => <ListGroupItem key={category.id}>
                    <Button onClick={categoryHandler} id={category.id} className={classes.listButton}>
                        {category.categoryName}
                    </Button>
                </ListGroupItem>)}
            </ListGroup>
            <ListGroupItem>
                    {selectedCategories.length !== 0 && <div>
                        <label className={classes.labelCustom}>Selected Categories:</label>
                        {selectedCategories.map(category =>
                            <div key={category.id} className={classes.boxCustom}>
                                <Button close onClick={removeCategoryHandler} id={category.id} className={classes.closeButton}/>
                                <span> {category.categoryName} </span>
                            </div>
                        )}
                    </div>}
                </ListGroupItem>
        </React.Fragment >
    )
};

export default Sidebar;