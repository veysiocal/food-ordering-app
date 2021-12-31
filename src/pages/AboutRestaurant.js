import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import Card from '../components/UI/Card';
import { adminActions } from '../store/admin-slice';
const AboutRestaurant = () => {

    const dispatch = useDispatch();

    const [enteredId, setEnteredId] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
    const [enteredDistrict, setEnteredDistrict] = useState('');

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

    const enteredDistrictHandler = event => {
        setEnteredDistrict(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log("Açıkama: ",enteredDescription)
        dispatch(adminActions.addRestaurant({
            enteredId,
            enteredName,
            enteredPhone,
            enteredEmail,
            enteredAddress,
            enteredDescription,
            enteredCategory,
            enteredDistrict,
        }));
    }
    return (
        <Form onSubmit={formSubmitHandler}>
            <Card>
                <FormGroup>
                    <Label for="exampleFile">
                        Logo Seç
                    </Label>
                    <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                    />
                </FormGroup>
                <FormGroup>
                    <Label >
                        Restoran Id
                    </Label>
                    <Input onChange={enteredIdHandler} value={enteredId} />
                </FormGroup>
                <FormGroup>
                    <Label >
                        Restoran Adı
                    </Label>
                    <Input onChange={enteredNameHandler} value={enteredName} />
                </FormGroup>
                <FormGroup>
                    <Label >
                        Kategori
                    </Label>
                    <Input onChange={enteredCategoryHandler} value={enteredCategory} />
                </FormGroup>
                <FormGroup>
                    <Label >
                        Telefon Numarası
                    </Label>
                    <Input onChange={enteredPhoneHandler} value={enteredPhone} />
                </FormGroup>
                <FormGroup>
                    <Label >
                        Bölge
                    </Label>
                    <Input
                        onChange={enteredDistrictHandler}
                        value={enteredDistrict}
                    />
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
                <Row form>
                    <Col md={6}>
                        <FormGroup>
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
                        </FormGroup>
                    </Col>
                    {/* <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="password placeholder"
                                type="password"
                            />
                        </FormGroup>
                    </Col> */}
                </Row>

                <FormGroup>
                    <Label >
                        Açıklama
                    </Label> <br />
                    <textarea rows='2' cols='79' onChange={enteredDescriptionHandler} value={enteredDescription}> dasdasdasdadsadsa </textarea>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleAddress2">
                        Address 2
                    </Label>
                    <Input
                        id="exampleAddress2"
                        name="address2"
                        placeholder="Apartment, studio, or floor"

                    />
                </FormGroup>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleCity">
                                City
                            </Label>
                            <Input
                                id="exampleCity"
                                name="city"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleState">
                                State
                            </Label>
                            <Input
                                id="exampleState"
                                name="state"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="exampleZip">
                                Zip
                            </Label>
                            <Input
                                id="exampleZip"
                                name="zip"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup check>
                    <Input
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                    />
                    <Label
                        check
                        for="exampleCheck"
                    >
                        Check me out
                    </Label>
                </FormGroup>
            </Card>
            <Button>
                Sign in
            </Button>
        </Form>

    )
};

export default AboutRestaurant;