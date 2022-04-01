import React, { useEffect, useReducer } from 'react';

import { validate } from '../Helpers/validators';

import classes from './Input.module.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        // value: props.initialValue || ''
        value: '',
        isTouched: false,
        isValid: false,
        // isValid: props.initialValid || false,
    });
    
    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const enteredInputHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const inputOrTextarea = props.inputOrText === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={enteredInputHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
    ) : (
        <textarea
            id={props.id}
            rows={props.rowNumber || 3}
            onChange={enteredInputHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
    );

    return (
        <div
            className={`${classes.formControl}
            ${!inputState.isValid && inputState.isTouched && classes.formControlInvalid}
            `}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {inputOrTextarea}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;