//libraries
import { useState, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
import { useSetRecoilState, useRecoilState } from 'recoil'

//css
import '../static/css/header.scss'
import '../static/css/hamMenuAnimation.scss'

//#region images
import logo from '../static/images/2.png'

import homeIco from '../static/images/nav/home.svg'
import locaIco from '../static/images/nav/location.png'
import userIco from '../static/images/nav/user.svg'
import vendorIco from '../static/images/nav/vendor.svg'
import provider from '../store/web3Provider'
//#endregion

//global state store
import { popups as pp, login as ll } from '../store/atoms'



function Header() {

    const [open, setOpen] = useState(false)
    const setPopup = useSetRecoilState(pp)
    const [login, setLogin] = useRecoilState(ll)

    const history = useHistory()

    //function to set ham menu open and close
    function hamOpener() {
        let list = document.querySelector('.nav-items')
        let ham = document.querySelector('.nav-icon')
        ham.classList.toggle('openHam')

        if (!open) {
            list.style.display = 'flex';

        }
        else {
            list.style.display = 'none';
        }
        setOpen(!open)
    }

    async function Logout() {
        try {
            await provider.logout()
            setPopup("Logged you out from portis");
            history.replace('/')
        } catch (error) {
            console.log(error.message);
        }
        finally {
            await isLoggedin()
        }
    }
    async function Login() {
        try {
            await provider.login()
            setPopup("Logged in successfully")
        }
        catch (error) {
            console.log(error.message);
            setPopup("Failed to login")
        }
        finally {
            await isLoggedin()
        }

    }
    async function isLoggedin() {
        const response = await provider.isLoggedIn()
        console.log("isLoggedIN ??", response);
        if (response.result) {
            setLogin(true)
        }
        else {
            setLogin(false)
        }
    }

    useEffect(() => {
        async function checkLogin() {
            await provider.setAccount()
            await isLoggedin()
        }
        checkLogin()
    }, [])

    return (
        <header>
            <nav className="navbar ">
                <div className="NavbarBrand">
                    <div id="logo">
                        <Link to='/'> <img src={logo} className="img-fluid LogoImg" alt="logo" /></Link>
                    </div>


                    <div className="pincodeContainer">
                        <div className="LocationImage">
                            <img src={locaIco} alt="location icon" />
                        </div>
                        <div className="location">
                            <Link to='/buy'>
                                <h6 className="ml-2">
                                    Enter secret key here!
                                </h6>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='nav-items mx-auto'>
                    <span className="d-flex">
                        <Link to='/'><span><img src={homeIco} alt="home icon" />
                            <h5 className="ml-2">
                                Home
                            </h5></span>
                        </Link>
                    </span>
                    <span>
                        {login
                            ? <a onClick={Logout}>
                                <span>
                                    <img src={vendorIco} alt="vendor icon" />
                                    <h5 className="ml-2">Logout</h5>
                                </span>
                            </a>
                            : <a onClick={Login}><span><img src={userIco} alt="user icon" /><h5 className="ml-2"> Login/Signup </h5></span></a>
                        }
                    </span>
                </div>

                <div onClick={hamOpener} id="hamMenu">
                    <div className="nav-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

            </nav>
        </header>)
}

export default Header