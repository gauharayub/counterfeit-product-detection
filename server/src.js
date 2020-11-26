const Web3 = require('web3');
const ganache = require("ganache-core");

const web3 = new Web3(ganache.provider());

const CounterfeitAbi = require('../build/contracts/Counterfeit.json')

//find this address from ganache
const CounterfeitAddress = '0x940f333167865baa78fdf8f8276410fc4317a19e'

const privateKey = '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'

web3.eth.getAccounts().then(async accounts => {
    try {

        // web3.eth.defaultAccount = accounts[0];
        // web3.eth.getTransactionCount(accounts[0]).then(console.log)

        //----------To Create New Account
        // const newAccount = await web3.eth.accounts.create();
        // console.log(newAccount.address);


        //declaring local contract instance to use its functions in json format
        const ct = await new web3.eth.Contract(CounterfeitAbi.abi, CounterfeitAddress)


        //----------ganache accounts are unlocked so no need to sign with key
        // await ct.methods.registerSeller("sak", "karwadi").send({ from: accounts[3],gas:2000000 })


        //----------generates account from private key
        const myAccount = await web3.eth.accounts.privateKeyToAccount(privateKey)
        console.log(myAccount.address);

        // console.log("Chain Id",await web3.eth.net.getId());


        //------------self signed transaction with private key
        // const tx = {
        //     // this could be provider.addresses[0] if it exists
        //     from: myAccount.address,
        //     // target address, this could be a smart contract address
        //     to: CounterfeitAddress,
        //     // optional if you want to specify the gas limit  
        //     // optional if you are invoking say a payable function 
        //     gas:200000,
        //     // this encodes the ABI of the method and the arguements
        //     data: ct.methods.registerSeller("NS", "Nerd").encodeABI()
        // };
        // const signedTran = await web3.eth.accounts.signTransaction(tx, privateKey)
        // const sentTx = web3.eth.sendSignedTransaction(signedTran.rawTransaction);     //raw form required 'hexadecimal'
        // sentTx.on("receipt", receipt => {
        //     // do something receipt comes back
        //     console.log("receipt", receipt);
        // });
        // sentTx.on("error", err => {
        //     // do something on transaction error
        //     console.log("Err", err);
        // });


        //------------this is wrong sendTransaction only works for unlocked accounts
        // web3.eth.accounts.signTransaction({
        //     to: '0x5b02F8E34425d0EbB7A87C208EDc4F9eab5F0A82',
        //     value: '1000000000',
        //     gas: 2000000
        // }, myPrivateKey)
        // .then(console.log);
        // const weiToSend = web3.utils.toWei('0.001','ether')
        // await web3.eth.sendTransaction({
        //     from:accounts[0],
        //     to:myAccount.address,
        //     value: weiToSend
        // })


        //--------simple balance query
        // const balance = await web3.eth.getBalance(accounts[0]) 
        // console.log("Remaining balance of ",accounts[0]," In ether is",web3.utils.fromWei(balance,'ether'))
        // console.log("Remaining balance of ",'myAccount.address'," In ether is",web3.utils.fromWei(await web3.eth.getBalance(myAccount.address) ,'ether'))

        // console.log("second",web3.utils.fromWei(await web3.eth.getBalance(accounts[2]) ,'ether'))
        // console.log(await ct.methods.productLength().call());
        // console.log(await ct.methods.sellersLength().call());


        //-----this one using ethereumjs-tx
        // let nonce = await web3.eth.getTransactionCount(myAccount.address)
        
        // nonce = nonce.toString(16);

        // const txParams = {
        //     nonce: '0x'+nonce, 
        //     gasPrice: '0x09184e72a000', 
        //     gasLimit: '0x30000',
        //     to: accounts[2], 
        //     value: '0x'+weiToSend.toString(16)
        //   };

        // const tx = new Tx(txParams,{chain:'ropsten'})

        // tx.sign(myPrivateKey); // Transaction Signing here

        // const serializedTx = tx.serialize();
        // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        //     console.log(receipt);
        //   })

        // console.log(await web3.eth.getGasPrice())
        console.log("second", web3.utils.fromWei(await web3.eth.getBalance(accounts[2]), 'ether'))
    }

    catch (error) {
        console.log("Other Error", error)
    }
})
    .catch(error => {
        console.log("Some Error")
    })

