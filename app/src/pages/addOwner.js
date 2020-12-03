import { useSetRecoilState } from 'recoil'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import Axios from '../store/axiosInstance'
import '../static/css/login.scss'
import Loader from '../components/loader'

import { popups } from '../store/atoms'

export default function AddOwner() {
    const setPopup = useSetRecoilState(popups)
    const [loading, setLoading] = useState(false)

    const schema = yup.object({
        email: yup.string().email().required('Required!').max(250),
    });

    const initialValues = {
        email: ''
    }
    
    async function addOwner(values) {
        try {
            setLoading(true)
            const response = await Axios.post('/owner/addowner', values)
            if (response.status === 200) {
                setPopup(`Owner Added successfully`)
            }
        }
        catch (error) {
            setPopup(error.message)
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    }


    return (<section>

        <div className="containerS">
            <div className="frame">
                {loading ? <Loader size="normal" /> :
                    <div>
                        <div className="nav">
                            <ul className="links">
                                <li className="signin-active"><a className="btn">Add Another Owner</a></li>
                            </ul>
                        </div>
                        <div className="formParent">

                            <Formik
                                validationSchema={schema}
                                onSubmit={addOwner}
                                initialValues={initialValues}
                            >
                                <Fm className="form-signin" name="form">

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="1">
                                            <Form.Label>Email </Form.Label>

                                            <Field
                                                tabIndex="1"
                                                type="text"
                                                placeholder="Email"
                                                name="email"
                                                className="form-styling" />


                                            <ErrorMessage name="email" />

                                        </Form.Group>

                                    </Form.Row>

                                    <Button className="btn btn-signup" tabIndex="4" type="submit">Add Seller</Button>

                                </Fm>
                            </Formik>
                        </div>
                    </div>
                }
            </div>
        </div>
    </section>)
}