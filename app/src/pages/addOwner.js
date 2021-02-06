import { useSetRecoilState, useRecoilState } from 'recoil'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { BiScan } from 'react-icons/bi'
import '../static/css/login.scss'
import Loader from '../components/loader'
import provider from '../store/web3Provider'
import { Link } from 'react-router-dom'

import { popups, newOwner as no } from '../store/atoms'

export default function TransferOwner() {
    const setPopup = useSetRecoilState(popups)
    const [newOwner, setNewOwner] = useRecoilState(no)
    const [loading, setLoading] = useState(false)

    const schema = yup.object({
        address: yup.string().required('Required!').max(60),
    });

    const initialValues = {
        address: newOwner
    }

    async function transferOwner(values) {
        try {
            setLoading(true)
            const response = await provider.sendTransaction('transferOwnership', [values.address])
            if (response) {
                setPopup(`Owner Added successfully`)
            }
            setNewOwner('')
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
                                <li className="signin-active"><a className="btn">Transfer Ownership</a></li>
                            </ul>
                        </div>
                        <div className="formParent">

                            <Formik
                                validationSchema={schema}
                                onSubmit={transferOwner}
                                initialValues={initialValues}
                            >
                                <Fm className="form-signin" name="form">

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="1">
                                            <Form.Label>New Owner's address </Form.Label>
                                            <div className="d-flex">

                                                <Field
                                                    tabIndex="1"
                                                    type="text"
                                                    placeholder="New Owner's address"
                                                    name="address"
                                                    className="form-styling" />

                                                <Link to={{ pathname: '/scan', query: { returnAddress: '/addowner', value: 'newOwner' } }}>
                                                    <BiScan size={35} color="white" />
                                                </Link>
                                            </div>
                                            <ErrorMessage name="address" />

                                        </Form.Group>

                                    </Form.Row>

                                    <Button className="btn btn-signup" tabIndex="4" type="submit">Add Owner</Button>

                                </Fm>
                            </Formik>
                        </div>
                    </div>
                }
            </div>
        </div>
    </section>)
}