import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from '../store/axiosInstance';
import { useSetRecoilState, useRecoilValue } from 'recoil';

//css
import '../static/css/signup.css'
import '../static/css/vendor.css'
import { login as ll} from '../store/atoms'

export default function AddProduct() {

    //local state
    const [successError, setSuccessError] = useState('')
    //redirect back to signup page if number is not set, or direct access

    const schema = yup.object({
        productName: yup.string().required('Required!').max(250, 'ProductName Should be less than 250 characters').test('no Num', "Number not allowed", async (val) => { if (val) { return await !val.match(/[0-9]+/) } return false }).test('noSpecial', "Special characters not allowed", async (val) => { if (val) { return await val.match(/[a-z]/i) } return false }),
        productPrice: yup.string().required('Required!'),
        productId: yup.string().required('Required!').max(50),
        productDetails: yup.string().required('Required!').max(250, 'Details Should be less than 350 characters')
    });

    const initialValues = {
        productName: "",
        productPrice: "",
        productId: "",
        productDetails: ""
    }

    const onSubmit = async (values) => {
        try {
            values.password = values.password1

            const response = await Axios.post('/seller/signup', values)

            console.log({ response })
            // if (response.data && response.data.status === "success") {
            //     setPopup("Form submitted succesfully")
            //     setLogin(true)
            //     // history.push('/')
            // }
        } catch (error) {
                // setPopup(t('toast.unknownError'))
                console.log(error)
        }
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
                                                    name="productName"
                                                    className="formControl" />
                                                <ErrorMessage name="productName" />
                                            </Form.Group>
                                        </Form.Row>


                                        <Form.Row>
                                            <Form.Group as={Col} controlId="2">
                                                <Form.Label>Product Price</Form.Label>
                                                <Field
                                                    tabIndex="2"
                                                    type="text"
                                                    placeholder="Price of the product"
                                                    name="productPrice"
                                                    className="formControl" />
                                                <ErrorMessage name="productPrice" />
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
                                            <Form.Group as={Col} controlId="5">
                                                <Form.Label>Details</Form.Label>
                                                <Field
                                                    tabIndex="4"
                                                    type="text"
                                                    placeholder="Details about your product"
                                                    name="productDetails"
                                                    className="formControl" />
                                                <ErrorMessage name="productDetails" />
                                            </Form.Group>
                                        </Form.Row>

                                        <Button className="edit modify" tabIndex="7" type="submit">Submit</Button>
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