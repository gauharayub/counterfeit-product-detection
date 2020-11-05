// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0;

import "./Ownable.sol";
import "./CommonStorage.sol";

/// @dev file for seller methods inherited by other contracts

contract Seller is Ownable{

    uint sellerId = 1000;
    uint reportThreshold = 100;
    // uint blockTime = 10 days;

    // Contract composition
    CommonStorage Store;

    // set Store object to the address of already deployed contract...
    constructor (address _store) public {
        Store  = CommonStorage(_store);
    }

    struct sellerDetails {
        uint id;
        uint reportCount;
        // uint unblockTime;
        string name;
        string details;

    }
    
    sellerDetails[] public sellers;

    mapping (address => uint) sellerAddressToSellerId;
    mapping (uint => uint) sellerIdToSellerIndex;
   
    mapping (uint => bool) productIdUsedForReport;

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

    function unblockSeller (address _sellerAddress) onlyOwner external returns (bool){
        uint sellerIndex = returnSellerIndex(_sellerAddress);
        sellers[sellerIndex].reportCount = 0;
        return true; 
    }

    function returnSellerIndex(address _sellerAddress) internal returns(uint){
        require(sellerAddressToSellerId[msg.sender] != 0);

        uint sellerId = sellerAddressToSellerId[_sellerAddress];
        return sellerIdToSellerIndex[sellerId];
    }

    function registerSeller (string memory _name, string memory _details) external {

        //checking seller is not registered before
        require(sellerAddressToSellerId[msg.sender] == 0);

        //increase random id
        sellerId++;

        //creating new instance and storing in array
        uint sellerIndex =  sellers.push(sellerDetails(sellerId,0,_name,_details)) - 1;

        //assingning index for future search
        sellerIdToSellerIndex[sellerId] = sellerIndex;
    }

    function registerReport(uint _productId) external returns(bool) {
        //one product is used once to report
        require(productIdUsedForReport[_productId] == 0);

        address productOwner = Store.productToOwner[_productId];
       
        uint sellerIndex = returnSellerIndex(productOwner);

        sellers[sellerIndex].reportCount++;

        productIdUsedForReport[_productId] = true;

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

        //not able to sell if blocked
        uint sellerIndex = returnSellerIndex(productOwner);
        require(sellers[sellerIndex].reportCount < reportThreshold);

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

        //buyer must be registered
        require(sellerAddressToSellerId[_buyerAddress] != 0);

        //if reports greater than certain threshold block them
        uint buyerIndex = returnSellerIndex(_buyerAddress);
        require(sellers[buyerIndex].reportCount < reportThreshold);
        
        // changing owner of product here
        Store.productToOwner[_productId] = _buyerAddress;

        // changing limit
        Store.productOwnerCount[msg.sender]--;
        Store.productOwnerCount[_buyerAddress]++;
        
        return true;
    }

}