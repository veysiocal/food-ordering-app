import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';

import Card from '../components/UI/Card';
import { adminActions } from '../store/admin-slice';
import { useHttp } from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorModal from '../components/UI/ErrorModal';

import classes from './AboutRestaurant.module.css';
import { uiActions } from '../store/ui-slice';
import { authActions } from '../store/auth-slice';
import Map from '../components/UI/Map';


const AboutRestaurant = () => {

    const [isLoading, haveError, sendRequest, clearError] = useHttp();
    const dispatch = useDispatch();
    const [Clatitude, seTClatitude] = useState('');
    const [Clongitude, setClongitude] = useState('');

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
            case 'F??r??n':
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

        const data = await sendRequest('http://localhost:8080/api/admin/businessInfos', 'POST',
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
                longitude: Clongitude,
                latitude: Clatitude,
            })
        );
        if (data && data.success) {
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Kayd??n??z olu??turuldu! L??tfen tekrar giri?? yap??n??z.',
            }));

            dispatch(uiActions.toggleNotification({
                show: true,
            }));
            dispatch(authActions.logout())
            //   history.replace('/auth')
        }

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

    const logoutHandler = () => {
        dispatch(authActions.logout())
    };


    const showPosition = (position) => {
        seTClatitude(position.coords.latitude);
        setClongitude(position.coords.longitude);
    }
    const getLocation = () => navigator.geolocation.getCurrentPosition(showPosition);

    return (
        <React.Fragment>
            {haveError && <ErrorModal error={haveError} onClear={clearError} />}
            <div className={classes.btndiv}>
                <button onClick={getLocation} className={classes.btn_getLocation}>L??tfen buraya t??klarak haritadan konum bilgileriniz elde edin!</button>
            </div>
            <div className={classes.mapContainer}>
                <Map center={{
                    lat: Clatitude,   //google mapsden alunacak latitude @ i??aretinden sonra gelen say??
                    lng: Clongitude,   //longitude lat'dan sonra gelen say??.
                }} zoom={16} />
            </div>
            <Form onSubmit={formSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Card >
                    {/* <FormGroup>
                    <Label for="exampleFile">
                        Logo Se??
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
                            Restoran Ad??
                        </Label>
                        <Input onChange={enteredNameHandler} value={enteredName} />
                    </FormGroup>
                    <FormGroup>
                        <select id='districtselect' className={classes.selector} placeholder='Se??im Yap??n??z' onChange={enteredCategoryHandler} value={enteredCategory}>
                            <option value=''>Kategori Se??iniz</option>
                            <option value='Restoran' >Restoran</option>
                            <option value='Pastane' >Pastane</option>
                            <option value='F??r??n' >F??r??n</option>
                            <option value='Kafe' >Kafe</option>
                            <option value='Manav' >Manav</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="startTime">
                            Ba??lang???? Saati
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
                            Biti?? Saati
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
                        <select id='districtselect' className={classes.selector} placeholder='Se??im Yap??n??z' onChange={enteredDistrictHandler} value={enteredDistrict}>
                            <option value=''>B??lge Se??iniz</option>
                            <option value='Kad??k??y'>Kad??k??y</option>
                            <option value='Kartal' >Kartal</option>
                            <option value='Maltepe' >Maltepe</option>
                            <option value='Pendik' >Pendik</option>
                            <option value='??sk??dar' >??sk??dar</option>
                            <option value='??mraniye' >??mraniye</option>
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
                            Telefon Numaras??
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
                        A????klama
                    </Label> <br />
                    <textarea rows='2' cols='79' onChange={enteredDescriptionHandler} value={enteredDescription}> dasdasdasdadsadsa </textarea>
                </FormGroup> */}

                    <button className={classes.abtRstBtn}>
                        Kaydet
                    </button>

                </Card>
            </Form>
            <button className={classes.closeButton} onClick={logoutHandler}>????k???? Yap</button>
        </React.Fragment>
    )
};

export default AboutRestaurant;