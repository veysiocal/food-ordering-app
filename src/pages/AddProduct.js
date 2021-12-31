import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import Card from '../components/UI/Card';
import { adminActions } from '../store/admin-slice';
import { uiActions } from '../store/ui-slice';
const AddProduct = () => {

    const dispatch = useDispatch();

    const [nameInput, setNameInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [dateInput, setDateInput] = useState();
    const [timeInput, setTimeInput] = useState();
    const [feeInput, setFeeInput] = useState('');
    const [amountInput, setAmountInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [idInput, setIdInput] = useState('');
    const [restaurantIdInput, setRestaurantIdInput] = useState('');

    const nameInputHandler = event => {
        setNameInput(event.target.value);
    };

    const typeInputHandler = event => {
        setTypeInput(event.target.value);
    };

    const dateInputHandler = event => {
        setDateInput(event.target.value);
    };

    const timeInputHandler = event => {
        setTimeInput(event.target.value);
    };

    const feeInputHandler = event => {
        setFeeInput(event.target.value);
    };

    const amountInputHandler = event => {
        setAmountInput(event.target.value);
    };

    const descriptionInputHandler = event => {
        setDescriptionInput(event.target.value);
    };

    const idInputHandler = event => {
        setIdInput(event.target.value);
    };

    const restaurantIdInputHandler = event => {
        setRestaurantIdInput(event.target.value);
    };

    const submitFormHandler = (event) => {
        event.preventDefault();

        const fee = Number(feeInput);

        console.log("event: ",event.target['restaurantId'].value);

        dispatch(adminActions.addProduct({
            restaurantIdInput,
            idInput,
            nameInput,
            typeInput,
            dateInput,
            timeInput,
            fee,
            amountInput,
            descriptionInput,
        }));
        setRestaurantIdInput('');
        setIdInput('');
        setNameInput('');
        setTypeInput('');
        setDateInput('');
        setTimeInput('');
        setFeeInput('');
        setAmountInput('');
        setDescriptionInput('');
    };

    return (
        <Form onSubmit={submitFormHandler}>
            <Card>
                <FormGroup>
                    <Label for='restaurantId'>
                        Restoran ID
                    </Label>
                    <Input onChange={restaurantIdInputHandler} value={restaurantIdInput} id='restaurantId' name='restaurantId'/>
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for='productId'>
                        Product ID
                    </Label>
                    <Input onChange={idInputHandler} value={idInput} id='productId' name='productId'/>
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for='productName'>
                        Ürün Adı
                    </Label>
                    <Input onChange={nameInputHandler} value={nameInput} id='productName' name='productName' />
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for='productType'>
                        Ürün Türü
                    </Label>
                    <Input onChange={typeInputHandler} value={typeInput} id='productType' name='productType' />
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for="exampleDate">
                        Tarih
                    </Label>
                    <Input
                        id="exampleDate"
                        name="date"
                        placeholder="date placeholder"
                        type="date"
                        onChange={dateInputHandler}
                        value={dateInput}
                    />
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for="exampleTime">
                        Saat
                    </Label>
                    <Input
                        id="exampleTime"
                        name="time"
                        placeholder="time placeholder"
                        type="time"
                        onChange={timeInputHandler}
                        value={timeInput}
                    />
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for='price'>
                        Fiyat
                    </Label>
                    <Input onChange={feeInputHandler} value={feeInput} type='number' id='price'/>
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for="exampleSelect">
                        Miktar
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        onChange={amountInputHandler}
                        value={amountInput}
                    >
                        <option>
                            1
                        </option>
                        <option>
                            2
                        </option>
                        <option>
                            3
                        </option>
                        <option>
                            4
                        </option>
                        <option>
                            5
                        </option>
                    </Input>
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for="exampleText">
                        Açıklama
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        onChange={descriptionInputHandler}
                        value={descriptionInput}
                    />
                </FormGroup>
            </Card>
            {/* <Card>
                <FormGroup>
                    <Label for="exampleFile">
                        File
                    </Label>
                    <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                    />
                    <FormText>
                        This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                    </FormText>
                </FormGroup>
            </Card>
            <Card>
                <FormGroup>
                    <Label for="exampleRange">
                        Range
                    </Label>
                    <Input
                        id="exampleRange"
                        name="range"
                        type="range"
                    />
                </FormGroup>
            </Card>
            <Card>
                <FormGroup check>
                    <Input type="radio" />
                    {' '}Option one is this and that—be sure to
                    <Label check>
                        include why it's great
                    </Label>
                </FormGroup>
            </Card>
            <Card>
                <FormGroup check>
                    <Input type="checkbox" />
                    <Label check>
                        Check me out
                    </Label>
                </FormGroup>
            </Card> */}
            <Button>Ekle</Button>
        </Form>
    )
};

export default AddProduct;
