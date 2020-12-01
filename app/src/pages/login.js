import { useSetRecoilState } from 'recoil'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Form, Col, Button } from 'react-bootstrap'

import Axios from '../store/axiosInstance'
import '../static/css/login.css'

import { login as ll } from '../store/atoms'

export default function Login() {

    const setLogin = useSetRecoilState(ll)

    const schema = yup.object({
        email: yup.string().required('Required!').max(250).email('Enter valid Email !'),
        password: yup.string().required('Required!').max(250),
        type: yup.string().required('Required!').max(10, 'Enter either "seller" or "owner"')
    });

    const initialValues = {
        email: "",
        type: "Seller",
        password: "",
    }

    function $(node) {
        return document.querySelector(node)
    }

    function buttonClick(event) {
        $(".form-signin").classList.toggle("form-signin-left");
        $(".form-signup").classList.toggle("form-signup-left");
        $(".frame").classList.toggle("frame-long");
        $(".signup-inactive").classList.toggle("signup-active");
        $(".signin-active").classList.toggle("signin-inactive");
        $(".forgot").classList.toggle("forgot-left");
        event.target.classList.remove("idle")
        event.target.classList.add("active");
    }

    function buttonSignup(event) {
        event.preventDefault()
        $(".nav").classList.toggle("nav-up");
        $(".form-signup-left").classList.toggle("form-signup-down");
        $(".frame").classList.toggle("frame-short");
    }

    function buttonSignin(values) {
        $(".frame").classList.toggle("frame-short");
        $(".forgot").classList.toggle("forgot-fade");

        submitSignin(values)
    }

    async function submitSignin(values) {
        try {
            const response = await Axios.post('/seller/login', values)
            if (response.status === 200) {
                setLogin(true)
            }

        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (<section>

        <div className="container">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active"><a className="btn" onClick={buttonClick}>Sign in</a></li>
                        <li className="signup-inactive"><a className="btn" onClick={buttonClick}>Sign up </a></li>
                    </ul>
                </div>
                <div className="formParent">

                    <Formik
                        validationSchema={schema}
                        onSubmit={buttonSignin}
                        initialValues={initialValues}
                    >
                        <Fm className="form-signin">

                            <Form.Row>
                                <Form.Group as={Col} controlId="1">
                                    <Form.Label>Type</Form.Label>
                                    <Field
                                        autoFocus
                                        tabIndex="1"
                                        type="text"
                                        placeholder="owner/seller"
                                        name="type"
                                        className="form-styling" />
                                    <ErrorMessage name="type" />

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
                                        className="form-styling" />
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
                                        name="password"
                                        className="form-styling" />
                                    <ErrorMessage name="password" />

                                </Form.Group>
                            </Form.Row>

                            <Button className="btn btn-signup" tabIndex="4" type="submit">Sign In</Button>
                        </Fm>
                    </Formik>

                    <form className="form-signup" onSubmit={buttonSignup} name="form">
                        <label htmlFor="fullname">Full name</label>
                        <input className="form-styling" type="text" name="fullname" placeholder="" />
                        <label htmlFor="email">Email</label>
                        <input className="form-styling" type="text" name="email" placeholder="" />
                        <label htmlFor="password">Password</label>
                        <input className="form-styling" type="text" name="password" placeholder="" />
                        <label htmlFor="confirmpassword">Confirm password</label>
                        <input className="form-styling" type="text" name="confirmpassword" placeholder="" />
                        <button type="submit" className="btn btn-signup">Sign Up</button>
                    </form>

                </div>

                <div className="forgot">
                    <a href="#">Forgot your password?</a>
                </div>
            </div>
        </div>
    </section>)
}