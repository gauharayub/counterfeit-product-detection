import React from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { popups} from '../store/atoms'
import { useSetRecoilState } from 'recoil'
import provider from '../store/web3Provider'
//css
import { useHistory } from 'react-router-dom';

import '../static/css/login.scss';

export default function RegisterSeller() {

    const setPopup = useSetRecoilState(popups)
    const history = useHistory()
    const schema = yup.object({
        name: yup.string().required('Required!').max(50, 'ProductName Should be less than 250 characters').test('no Num', "Number not allowed", async (val) => { if (val) { return await !val.match(/[0-9]+/) } return false }).test('noSpecial', "Special characters not allowed", async (val) => { if (val) { return await val.match(/[a-z]/i) } return false }),
        details: yup.string().required('Required!').max(160),
    });

    const initialValues = {
        name: "",
        details:""
    }

    async function register(values) {
        try {
            console.log(values);
            // send transaction for adding a product....
            await provider.sendTransaction('registerSeller', [values.name,values.details]);
            setPopup('Registered successfully');
            history.push('/')

        } catch (error) {
            setPopup('Failed to Register');
            console.log(error)
        }
    }

    return (<section>
        <div className="containerS">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active"><a className="btn">Register yourself as a seller</a></li>
                    </ul>
                </div>
                <div className="formParent">
                    <Formik
                        validationSchema={schema}
                        onSubmit={register}
                        initialValues={initialValues}
                    >
                        <Fm key={1} className="form-signin" name="form">

                            <Form.Row>
                                <Form.Group as={Col} controlId="1">
                                    <Form.Label>Business Name</Form.Label>
                                    <Field
                                        tabIndex="1"
                                        type="text"
                                        placeholder="Your business name"
                                        name="name"
                                        className="form-styling" />
                                    <ErrorMessage name="name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="2">
                                    <Form.Label>Shop Address/Details</Form.Label>
                                    <Field
                                        tabIndex="2"
                                        type="text"
                                        placeholder="Shop Address/Details"
                                        name="details"
                                        className="form-styling" />
                                    <ErrorMessage name="details" />
                                </Form.Group>
                            </Form.Row>

                            <Button className="btn btn-signup" tabIndex="5" type="submit">Register</Button>
                        </Fm>
                    </Formik>
                </div>
            </div>
        </div>
    </section>
    )
}