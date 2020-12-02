import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from '../store/axiosInstance';
import { useSetRecoilState, useRecoilValue } from 'recoil';

//css
import '../static/css/signup.css';
import '../static/css/vendor.css';
import { login as ll} from '../store/atoms';


export default function AddProduct() {

    //local state
    const [successError, setSuccessError] = useState('');

    const [submitted, setSubmitted] = useState('');

    const [productId, setProductId] = useState('');

    const schema = yup.object({
        name: yup.string().required('Required!').max(250, 'ProductName Should be less than 250 characters').test('no Num', "Number not allowed", async (val) => { if (val) { return await !val.match(/[0-9]+/) } return false }).test('noSpecial', "Special characters not allowed", async (val) => { if (val) { return await val.match(/[a-z]/i) } return false }),
        price: yup.string().required('Required!'),
        productId: yup.string().required('Required!').max(50),
        details: yup.string().required('Required!').max(250, 'Details Should be less than 350 characters')
    });

    const initialValues = {
        name: "",
        price: "",
        productId: "",
        details: ""
    }

    const onSubmit = async (values) => {
       
        // try {
        //     // const secretId = ""

        //     // const response = await Axios.post('/owner/addproduct', 
        //     //                 {values, secretId})

        //     // console.log(response)

        // } catch (error) {
        //         // setPopup(t('toast.unknownError'))
        //         // console.log(error)
        // }
        setProductId(values.productId);
        setSubmitted(true);

    }

    if(submitted){
        return (
            <Redirect to={`/qrcode/${productId}`} />
        )
    }

    return (
        <div className="signupdiv Signup">
            <div className="signupdetailscontainer signupcontainer">
                <div className="row">
                    <div className="col-lg-6 ">
                        <div className="leftDiv">
                            <h1>Add Product</h1>
                            {successError && <h5 className="error">{successError}</h5>}
                            <Formik
                                validationSchema={schema}
                                onSubmit={onSubmit}
                                initialValues={initialValues}
                            >
                                <Fm >
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="1">
                                            <Form.Label>Product Name</Form.Label>
                                            <Field
                                                autoFocus
                                                tabIndex="1"
                                                type="text"
                                                placeholder="Name of product"
                                                name="name"
                                                className="formControl" />
                                            <ErrorMessage name="name" />
                                        </Form.Group>
                                    </Form.Row>


                                    <Form.Row>
                                        <Form.Group as={Col} controlId="2">
                                            <Form.Label>Product Price</Form.Label>
                                            <Field
                                                tabIndex="2"
                                                type="text"
                                                placeholder="Price of the product"
                                                name="price"
                                                className="formControl" />
                                            <ErrorMessage name="price" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="3">
                                            <Form.Label>Product ID</Form.Label>
                                            <Field
                                                tabIndex="3"
                                                type="text"
                                                placeholder="Enter the unique ID of product"
                                                name="productId"
                                                className="formControl" />
                                            <ErrorMessage name="productId" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="4">
                                            <Form.Label>Details</Form.Label>
                                            <Field
                                                tabIndex="4"
                                                type="text"
                                                placeholder="Details about your product"
                                                name="details"
                                                className="formControl" />
                                            <ErrorMessage name="details" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Button className="edit modify" tabIndex="5" type="submit">Submit</Button>
                                </Fm>
                            </Formik>
                        </div>
                    </div>
                    <div className="col-lg-6 ">
                        <div className="imageContainer">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}