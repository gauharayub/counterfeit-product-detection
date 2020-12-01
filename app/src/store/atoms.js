import { atom } from "recoil"

const login = atom({
    key: 'login',
    default: false,
})
const popups = atom({
    key: 'popups',
    default:''
})

export { login,popups }