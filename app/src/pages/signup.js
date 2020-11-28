import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Axios from '../store/axiosInstance'
import {useHistory} from 'react-router-dom'
import { useSetRecoilState, useRecoilValue } from 'recoil';

//css
import '../static/css/signup.css'
import '../static/css/vendor.css'
import { login as ll} from '../store/atoms'

function SignupDetails() {

   
    const history = useHistory()
    //global state
    const setLogin = useSetRecoilState(ll)
    // const setPopup = useSetRecoilState(pp)

    //local state
    const [successError, setSuccessError] = useState('')
    //redirect back to signup page if number is not set, or direct access

    const schema = yup.object({
        name: yup.string().required('Required!').max(250, 'Name Should be less than 250 characters').test('no Num', "Number not allowed", async (val) => { if (val) { return await !val.match(/[0-9]+/) } return false }).test('noSpecial', "Special characters not allowed", async (val) => { if (val) { return await val.match(/[a-z]/i) } return false }),
        email: yup.string().required('Required!').max(250).email('Enter valid Email !'),
        password1: yup.string().required('Required!').max(250),
        password2: yup.string().required('Required!').oneOf([yup.ref('password1'), null], "Password doesn't match"),
        details: yup.string().required('Required!').max(350, 'Details Should be less than 350 characters')
    });

    const initialValues = {
        name: "",
        email: "",
        password1: "",
        password2: "",
        details:""
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
                                <h1>Signup Form</h1>
                                {successError && <h5 className="error">{successError}</h5>}
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={onSubmit}
                                    initialValues={initialValues}
                                >
                                    <Fm >

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="1">
                                                <Form.Label>Business Name</Form.Label>
                                                <Field
                                                    autoFocus
                                                    tabIndex="1"
                                                    type="text"
                                                    placeholder="Business Name"
                                                    name="name"
                                                    className="formControl" />
                                                <ErrorMessage name="name" />

                                            </Form.Group>


                                        </Form.Row>



                                        <Form.Row>
                                            <Form.Group as={Col} controlId="2">
                                                <Form.Label>Email</Form.Label>
                                                <Field
                                                    tabIndex="2"
                                                    type="email"
                                                    placeholder="Email"
                                                    name="email"
                                                    className="formControl" />
                                                <ErrorMessage name="email" />

                                            </Form.Group>


                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="3">
                                                <Form.Label>Password</Form.Label>
                                                <Field
                                                    tabIndex="3"
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password1"
                                                    className="formControl" />
                                                <ErrorMessage name="password1" />

                                            </Form.Group>


                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="4">
                                                <Form.Label>Repeat Password</Form.Label>
                                                <Field
                                                    tabIndex="4"
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password2"
                                                    className="formControl" />
                                                <ErrorMessage name="password2" />

                                            </Form.Group>


                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="5">
                                                <Form.Label>Details</Form.Label>
                                                <Field
                                                    tabIndex="5"
                                                    type="text"
                                                    placeholder="Details about your shop"
                                                    name="details"
                                                    className="formControl" />
                                                <ErrorMessage name="details" />

                                            </Form.Group>
                                        </Form.Row>

                                        <Button className="edit modify" tabIndex="7" type="submit">Submit</Button>
                                    </Fm>
                                </Formik>
                            </div>
                        </div>
                        <div className="col-lg-6 ">
                            <div className="imageContainer">
                                BlaBla
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default SignupDetails;