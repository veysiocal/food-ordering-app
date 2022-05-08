import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttp } from '../hooks/use-http';
import { adminActions } from '../store/admin-slice';
import { uiActions } from '../store/ui-slice';
const AddProduct = () => {

    const dispatch = useDispatch();
    const [isLoading, haveError, sendRequest] = useHttp();

    const token = useSelector(state => state.auth.token);

    const [nameInput, setNameInput] = useState('');
    // const [typeInput, setTypeInput] = useState('');
    // const [dateInput, setDateInput] = useState();
    // const [timeInput, setTimeInput] = useState();
    // const [endTime, setEndTime] = useState();
    const [feeInput, setFeeInput] = useState('');
    // const [amountInput, setAmountInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    // const [idInput, setIdInput] = useState('');
    // const [restaurantIdInput, setRestaurantIdInput] = useState('');

    const nameInputHandler = event => {
        setNameInput(event.target.value);
    };

    // const typeInputHandler = event => {
    //     setTypeInput(event.target.value);
    // };

    // const dateInputHandler = event => {
    //     setDateInput(event.target.value);
    // };

    // const endTimeHandler = event => {
    //     setEndTime(event.target.value);
    // };

    // const timeInputHandler = event => {
    //     setTimeInput(event.target.value);
    // };

    // const feeInputHandler = event => {
    //     setFeeInput(event.target.value);
    // };

    // const amountInputHandler = event => {
    //     setAmountInput(event.target.value);
    // };

    const descriptionInputHandler = event => {
        setDescriptionInput(event.target.value);
    };

    // const idInputHandler = event => {
    //     setIdInput(event.target.value);
    // };

    // const restaurantIdInputHandler = event => {
    //     setRestaurantIdInput(event.target.value);
    // };

    const submitFormHandler = (event) => {
        event.preventDefault();

        // const fee = Number(feeInput);

        dispatch(adminActions.addProduct({
            nameInput,
            descriptionInput,
        }));
        const data = sendRequest('http://localhost:8080/api/admin/add-new-product', 'POST',
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: ' + token,
            },
            JSON.stringify({
                title: nameInput,
                description: descriptionInput,
            }),
        );

        if (data.success === true) {
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: data.message,
            }));

            dispatch(uiActions.toggleNotification({
                show: true,
            }));

        }

        setNameInput('');
        setDescriptionInput('');
    };

    if (isLoading) {
        return (
            <LoadingSpinner asOverlay />
        )
    }

    if (haveError) {
        return (
            <h2>Error: {haveError}</h2>
        )
    }

    return (
        <Form onSubmit={submitFormHandler}>
            <Card>
                <FormGroup>
                    <Label for='productName'>
                        Ürün Adı
                    </Label>
                    <Input onChange={nameInputHandler} value={nameInput} id='productName' name='productName' />
                </FormGroup>
                {/* <FormGroup>
                    <Label for='productType'>
                        Ürün Türü
                    </Label>
                    <Input onChange={typeInputHandler} value={typeInput} id='productType' name='productType' />
                </FormGroup> */}
                {/* <FormGroup>
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
                </FormGroup> */}
                {/* <FormGroup>
                    <Label for="startTime">
                        Başlangıç Saati
                    </Label>
                    <Input
                        id="startTime"
                        name="time"
                        placeholder="time placeholder"
                        type="time"
                        onChange={timeInputHandler}
                        value={timeInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="endTime">
                        Bitiş Saati
                    </Label>
                    <Input
                        id="endTime"
                        name="time"
                        placeholder="time placeholder"
                        type="time"
                        onChange={endTimeHandler}
                        value={endTime}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='price'>
                        Fiyat
                    </Label>
                    <Input onChange={feeInputHandler} value={feeInput} type='number' id='price' />
                </FormGroup>
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
                </FormGroup> */}
                <FormGroup>
                    <Label for="exampleText">
                        Açıklama
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        placeholder='Ürünün miktar birimi hakkında açıklama giriniz. Örnek porsiyon, kg, adet...'
                        onChange={descriptionInputHandler}
                        value={descriptionInput}
                    />
                </FormGroup>
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
            </Card>

        </Form>
    )
};

export default AddProduct;
