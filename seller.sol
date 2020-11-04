pragma solidity >=0.7.0;

import "./commonQuery.sol";

///@dev file for seller methods inherited by other contracts

contract Seller is CommonQuery{

    struct Seller {
        uint id;
        uint reports;
        string name;
        string details;
    }
    
    Seller[] internal sellers;

    mapping (address => uint) sellerIdToSellerIndex;

    modifier sellerCheck(uint _productId){
        require (msg.sender == productToOwner[_productId]);
        _;
    }

    modifier soldCheck(uint _productId){
        //finding product index
        uint productIndex = productIdToProductIndex[_productId];

        //finding product from index
        Product currentProduct = products[productIndex];
        require(currentProduct.isSold == false);

        _;
    }
    //should be called by consumers
    function buyProduct(uint _secretId) external returns(bool) {
        //finding product index
        uint productIndex = secretIdToProductIndex[_secretId];
        
        //finding product from index
        Product currentProduct = products[productIndex];
        
        //productId from product
        uint productId = currentProduct.productId;

        //product current owner from productId 
        address productOwner = productToOwner[productId];

        require(productOwnerCount[productOwner]>0);

        //marking product as soldi i.e. bought by consumer
        currentProduct.isSold = true;

        //reducing owner count
        productOwnerCount[productOwner]--;

        return true;
    }

    //should be called for reselling
    function sellProduct(uint _productId, address _buyerAddress) external sellerCheck(_productId) soldCheck(_productId) returns(bool){
        //checking for limit
        require(productOwnerCount[msg.sender]>0);

        //changing owner of product here
        productToOwner[_productId] = _buyerAddress;

        //changing limit
        productOwnerCount[msg.sender]--;
        productOwnerCount[_buyerAddress]++;
        
        return true;
    }

}