import { atom } from "recoil"

const login = atom({
    key: 'login',
    default: false,
})
const popups = atom({
    key: 'popups',
    default: ''
})

const buyerAddress = atom({
    key: 'buyerAddress',
    default: ''
})

const productId = atom({
    key: 'productId',
    default: ''
})
const fall = atom({
    key: 'fall',
    default: ''
})
export { login, popups, buyerAddress, productId, fall }