import Portis from '@portis/web3';
import Web3 from 'web3';
import Abi from './abi'

// private ganache node...
const myPrivateEthereumNode = {
    nodeUrl: 'http://127.0.0.1:8545', // node url
    chainId: 4444, // chainid
};

const provider = {
    contractAddress: '0xe982e462b094850f12af94d21d470e21be9d0e9c',
    w3: undefined,
    account: null,
    contract: null,
    portis: '',
    logout: async function () {
        await this.portis.logout()
    },
    login: async function () {
        await this.portis.showPortis()
        await provider.setAccount()
    },
    isLoggedIn: async function () {
        return await this.portis.isLoggedIn()
    },
    setAccount: async function () {
        const account = await this.w3.eth.getAccounts()
        this.account = account[0]
        console.log(account);
    },

    getAccount: function () {
        return this.account
    },

    getProvider: function () {
        return this.w3;
    },

    setProvider: async function () {
        this.portis = await new Portis('42dca739-f49f-4002-a181-82cdaadc7dd5', myPrivateEthereumNode);
        this.w3 = await new Web3(this.portis.provider)
    },

    setContract: async function () {
        const contract = await new this.w3.eth.Contract(Abi.abi, this.contractAddress);
        this.contract = contract;
        return contract;
    },

    // for non-transaction methods ex- view pure
    callTransaction: async function (method, parameters = []) {
        try {
            const transaction = {
                from: this.account,
                to: this.contractAddress,
            }
            const result = await this.contract.methods[method](...parameters).call(transaction);
            return result;
        } catch (error) {
            console.log(error);
            return "Failed to call";
        }
    },

    // method for transaction that require fee....
    sendTransaction: async function (method, parameters = []) {
        try {
            const transaction = {
                from: this.account,
                to: this.contractAddress,
                gas: 500000,
            }
            const receipt = await this.contract.methods[method](...parameters).send(transaction);
            console.log(receipt);
            return receipt
        } catch (error) {
            console.log(error);
            return error.message
        }
    }
}

const common = {
    getBalance: async function () {
        try {
            const balance = await this.w3.eth.getBalance(this.account.address);
            return balance;
        } catch (error) {
            console.log(error.message);
            return 'Failed to get balance'
        }
    }
};

export default provider