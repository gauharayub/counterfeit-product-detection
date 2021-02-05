import Portis from '@portis/web3';
import Web3 from 'web3';
import Abi from './abi'
import keccak256 from 'keccak256'

// private ganache node...
const myPrivateEthereumNode = {
    nodeUrl: 'http://127.0.0.1:7545', // node url
    chainId: 5777, // chainid
    gasRelayHubAddress: '0xd216153c06e857cd7f72665e0af1d7d82172f494', // contract address of relayHub....
};

const provider = {
    // anas-contract - 0x5017A545b09ab9a30499DE7F431DF0855bCb7275
    contractAddress: '0xC8906CA76bd137732A9Cf6835Fe8CE6892Bc0a7D',
    buyAddress: '0xE2911492251ea3e02Fd2865F56bD11c1d5F166B3',
    w3: null,
    account: null,
    contract: null,
    buyContract: null,
    portis: null,
    logout:async function () {
        await this.portis.logout()
    },
    keccakHash: function (secretId) {
        const encoding = this.w3.eth.abi.encodeParameter('uint256', secretId)
        const hash = keccak256(encoding)
        return hash
    },
    login: async function () {
        await this.portis.showPortis()
        await provider.setAccount()
    },
    isLoggedIn: async function () {
        if (this.portis) {
            return await this.portis.isLoggedIn()
        }
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
        this.portis = await new Portis('42dca739-f49f-4002-a181-82cdaadc7dd5', 'rinkeby', { gasRelay: true });
        this.w3 = await new Web3(this.portis.provider)
    },

    setContract: async function () {
        const contract = await new this.w3.eth.Contract(Abi.counterfeitAbi, this.contractAddress);
        const side = await new this.w3.eth.Contract(Abi.buyAbi, this.buyAddress)
        this.buyContract = side
        this.contract = contract;
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
            return { message:error.message, code:204};
        }
    },

    // method for transaction that require fee....
    sendTransaction: async function (method, parameters = [], toBuy = false) {
        try {
            if (toBuy) { 
                const transaction = {
                    from: this.account,
                    to: this.buyAddress,
                    gas: 500000,
                }
                const receipt = await this.buyContract.methods[method](...parameters).send(transaction);
                console.log(receipt);
                return receipt
            }
            else {
                const transaction = {
                    from: this.account,
                    to: this.contractAddress,
                    gas: 500000,
                }
                const receipt = await this.contract.methods[method](...parameters).send(transaction);
                console.log(receipt);
                return receipt
            }
        } catch (error) {
            console.log(error);
            return new Error(error.message)
        }
    }
}
export default provider