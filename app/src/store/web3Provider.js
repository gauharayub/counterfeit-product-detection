import Portis from '@portis/web3';
import Web3 from 'web3';
import Abi from './abi'

// private ganache node...
const myPrivateEthereumNode = {
  nodeUrl: 'http://127.0.0.1:7545', // node url
  chainId: 5777, // chainid
}; 

const provider = {
    contractAddress: '0x0d7763D94007D56f6a926DCed46bfEB09a679bFe',
    w3: undefined,
    account: null,
    contract: null,

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
        const portis = await new Portis('42dca739-f49f-4002-a181-82cdaadc7dd5', myPrivateEthereumNode);
        const web = await new Web3(portis.provider)
        this.w3 = web;
        // import ganache account in portis....
        // const privateKeyOrMnemonic = "";
        // portis.importWallet(privateKeyOrMnemonic);
    },

    setContract: async function () {
        const contract = await new this.w3.eth.Contract(Abi.abi, this.contractAddress);
        this.contract = contract;
        return contract;
    },

    // for non-transaction methods ex- view pure
    callTransaction: async function (method, parameters=[]) {
        try {
            const transaction = {
                from: this.account,
                to: this.contractAddress,
            }
            const result = await this.contract.methods[method](...parameters).call(transaction);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            return "Failed to call";
        }
    },

    //sign provide exact method as string second parameter
    // signTransaction: async function (method) {
    //     try {
    //         const transaction = {
    //             from: this.account,
    //             to: this.contractAddress,
    //             gas: 500000,
    //             data: this.contract.methods[method].encodeABI()
    //         };

    //         const signedTransaction = await this.w3.eth.accounts.signTransaction(
    //             transaction
    //         );
    //         return signedTransaction
    //     } catch (error) {
    //         console.log(error.message);
    //         return "Failed to sign"
    //     }
    // },

    // method for transaction that require fee....
    sendTransaction: async function (method, parameters=[]) {
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
            console.log(error.message);
            return "Failed to send transaction"
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