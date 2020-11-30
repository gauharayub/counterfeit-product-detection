import { atom } from "recoil"

const login = atom({
    key: 'login',
    // true for development and testing purpose..
    default: true,
})

export { login }