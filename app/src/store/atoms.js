import { atom } from "recoil"

const login = atom({
    key: 'login',
    default: false,
})

export { login }