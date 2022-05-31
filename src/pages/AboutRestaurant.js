import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';

import Card from '../components/UI/Card';
import { adminActions } from '../store/admin-slice';
import { useHttp } from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorModal from '../components/UI/ErrorModal';

import classes from './AboutRestaurant.module.css';

const AboutRestaurant = () => {

    const [isLoading, haveError, sendRequest, clearError] = useHttp();
    const dispatch = useDispatch();

    const [enteredId, setEnteredId] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [enteredDistrict, setEnteredDistrict] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const enteredIdHandler = event => {
        setEnteredId(event.target.value);
    };

    const enteredNameHandler = event => {
        setEnteredName(event.target.value);
    };

    const enteredPhoneHandler = event => {
        setEnteredPhone(event.target.value);
    };

    const enteredEmailHandler = event => {
        setEnteredEmail(event.target.value);
    };

    const enteredAddressHandler = event => {
        setEnteredAddress(event.target.value);
    };

    const enteredDescriptionHandler = event => {
        setEnteredDescription(event.target.value);
    };

    const enteredCategoryHandler = event => {
        setEnteredCategory(event.target.value);
    };

    const startTimeHandler = event => {
        setStartTime(event.target.value);
    };

    const endTimeHandler = event => {
        setEndTime(event.target.value);
    };

    const enteredDistrictHandler = event => {
        setEnteredDistrict(event.target.value);
    };

    let userEmail = useSelector(state => state.auth.email);
    let token = useSelector(state => state.auth.token);

    let categoryId;

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        switch (enteredCategory) {
            case 'Restoran':
                categoryId = 1;
                break;
            case 'Pastane':
                categoryId = 2;
                break;
            case 'Fırın':
                categoryId = 3;
                break;
            case 'Kafe':
                categoryId = 4;
                break;
            case 'Manav':
                categoryId = 5;
                break;
            default: categoryId = 1;
        }

        await sendRequest('http://localhost:8080/api/admin/businessInfos', 'POST',
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: ' + token
            },
            JSON.stringify({
                // owner: userEmail,
                businessTypeId: categoryId,
                companyName: enteredName,
                companyPhone: enteredPhone,
                district: enteredDistrict,
                address1: enteredAddress,
                start: startTime,
                end: endTime,
            })
        );
        // if(data && data.success) {
        //     alert('Başarılı!')
        // }

        setEnteredId('');
        setEnteredName('');
        setEnteredPhone('');
        setEnteredEmail('');
        setEnteredAddress('');
        setEnteredDescription('');
        setEnteredCategory('');
        setEnteredDistrict('');
        setStartTime('');
        setEndTime('');
    }

    return (
        <React.Fragment>
            { haveError && <ErrorModal error={haveError} onClear={clearError} />}
            <Form onSubmit={formSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Card >
                    {/* <FormGroup>
                    <Label for="exampleFile">
                        Logo Seç
                    </Label>
                    <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                    />
                </FormGroup> */}
                    {/* <FormGroup>
                        <Label >
                            BusinessType Id
                        </Label>
                        <Input onChange={enteredIdHandler} value={enteredId} />
                    </FormGroup> */}
                    <FormGroup>
                        <Label >
                            Restoran Adı
                        </Label>
                        <Input onChange={enteredNameHandler} value={enteredName} />
                    </FormGroup>
                    <FormGroup>
                        <select id='districtselect' className={classes.selector} placeholder='Seçim Yapınız' onChange={enteredCategoryHandler} value={enteredCategory}>
                            <option value=''>Kategori Seçiniz</option>
                            <option value='Restoran' >Restoran</option>
                            <option value='Pastane' >Pastane</option>
                            <option value='Fırın' >Fırın</option>
                            <option value='Kafe' >Kafe</option>
                            <option value='Manav' >Manav</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="startTime">
                            Başlangıç Saati
                        </Label>
                        <Input
                            id="startTime"
                            name="time"
                            placeholder="time placeholder"
                            type="time"
                            onChange={startTimeHandler}
                            value={startTime}
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
                        <select id='districtselect' className={classes.selector} placeholder='Seçim Yapınız' onChange={enteredDistrictHandler} value={enteredDistrict}>
                            <option value=''>Bölge Seçiniz</option>
                            <option value='Kadıköy'>Kadıköy</option>
                            <option value='Kartal' >Kartal</option>
                            <option value='Maltepe' >Maltepe</option>
                            <option value='Pendik' >Pendik</option>
                            <option value='Üsküdar' >Üsküdar</option>
                            <option value='Ümraniye' >Ümraniye</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress">
                            Adres
                        </Label>
                        <Input
                            id="exampleAddress"
                            name="address"
                            placeholder="1234 Main St"
                            onChange={enteredAddressHandler}
                            value={enteredAddress}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label >
                            Telefon Numarası
                        </Label>
                        <Input onChange={enteredPhoneHandler} value={enteredPhone} />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="with a placeholder"
                            type="email"
                            onChange={enteredEmailHandler}
                            value={enteredEmail}
                        />
                    </FormGroup> */}

                    {/* <FormGroup>
                    <Label >
                        Açıklama
                    </Label> <br />
                    <textarea rows='2' cols='79' onChange={enteredDescriptionHandler} value={enteredDescription}> dasdasdasdadsadsa </textarea>
                </FormGroup> */}

                    <button className={classes.abtRstBtn}>
                        Sign in
                    </button>
                </Card>
            </Form>
        </React.Fragment>
    )
};

export default AboutRestaurant;