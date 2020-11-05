// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0;

import "./Ownable.sol";
import "./CommonStorage.sol";

/// @dev file for seller methods inherited by other contracts

contract Seller is Ownable{

    // Contract composition
    CommonStorage Store;

    // set Store object to the address of already deployed contract...
    constructor (address _store) public {
        Store  = CommonStorage(_store);
    }

    struct sellerDetails {
        uint id;
        uint reportCount;
        string name;
        string details;
    }
    
    sellerDetails[] public sellers;

    modifier sellerCheck(uint _productId) {
        // check if the seller owns the product or not...
        address productOwner = Store.productToOwner[_productId];
        require(msg.sender == productOwner);
        _;
    }

    modifier soldCheck(uint _productId) {
        // finding product index
        uint productIndex = Store.productIdToProductIndex[_productId];

        // finding product from index
        bool isSold = Store.products[productIndex].isSold;
        require(isSold == false);
        _;
    }

    // should be called by consumers
    function buyProduct(uint _secretId) external returns(bool) {
        // finding product index using secret id from the in the common storage...
        uint productIndex = Store.secretIdToProductIndex[_secretId];
        
        // productId from product
        uint productId = Store.products[productIndex].productId;

        // product current owner from productId 
        address productOwner = Store.productToOwner[productId];

        require(Store.productOwnerCount[productOwner] > 0);

        // marking product as soldi i.e. bought by consumer
        Store.products[productIndex].isSold = true;

        // reducing owner count
        Store.productOwnerCount[productOwner]--;

        return true;
    }

    // should be called for reselling
    function sellProduct(uint _productId, address _buyerAddress) external sellerCheck(_productId)
    soldCheck(_productId) returns(bool) {
        // checking for limit
        require(Store.productOwnerCount[msg.sender] > 0);

        // changing owner of product here
        Store.productToOwner[_productId] = _buyerAddress;

        // changing limit
        Store.productOwnerCount[msg.sender]--;
        Store.productOwnerCount[_buyerAddress]++;
        
        return true;
    }

}