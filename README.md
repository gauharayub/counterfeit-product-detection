# FORGE
Forge is a blockchain based web application to fight product counterfeiting.

## Installation

Uses [truffle](https://www.trufflesuite.com/) for easy compilation and deployment.

## Steps to run the application

1. Install dependencies for smart contracts

    ```
    npm i
    ```

2. Modify truffle-config.js file depending upon the blockchain network you are using for deploying and then deploy smart contracts to local-blockchain/testnet/mainnet. Example - 
    ```
    truffle deploy --network development
    ``` 

3. In web3Provider.js file modify values of `contractAddress`, `nodeurl`, `chainId`, `buyAddress` with your deployed values.


4. Install dependencies and run frontend application
    ```
    cd app
    npm i 
    npm start
    ```

# Demo Images

## Home

![Home](/images/home.png)

## Add Product Form 
#### Only accessible by owner account

![Add Product Form](/images/addProduct.png)

## After Product is Added
#### displays the qr code embedding visible key which can be used to fetch details of a product and it current seller 

![After Product is Added](/images/afterProductAdd.png)

## Login/Signin Form

![Login/Signin Form](/images/login.png)


## Product Details Page
#### displays the details of product and its seller

![Product Details Page](/images/productInfo.png)


## Product List 
#### Lists all the products owned by a particular seller

![Product List](/images/productList.jpeg)


## Product Info
#### Seller can see the info of any product owned by it by clicking on any item of list 

![Product Info](/images/productDetailsList.png)