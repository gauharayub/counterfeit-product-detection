// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0;

import "./Ownable.sol";
import "./CommonStorage.sol";

///@dev file for owner query methods inherited by other contracts

contract ProductOwner is Ownable{

     // Contract composition
    CommonStorage Store;

    // set Store object to the address of already deployed CommonStorage contract...
    constructor (address _store) public {
        Store  = CommonStorage(_store);
    }
  
    function addProduct(uint _productId, uint _secretId, uint _price, string memory _name, 
    string memory _details) onlyOwner external returns(bool) {

        //checking that both product and secret ids are not used before
        require(Store.productIdToProductIndex[_productId] == 0);
        require(Store.secretIdToProductIndex[_secretId] == 0);
        
        //assigning owner to the one who initiated the call...
        Store.productToOwner[_productId] = msg.sender;
        Store.productOwnerCount[msg.sender]++;        

        //addint product to products array
        Store.products.push(Store.Product(_productId, _price, _name, _details, false));
        uint index = Store.products.length - 1;

        //setting index in mappings
        Store.productIdToProductIndex[_productId] = index;
        Store.secretIdToProductIndex[_secretId] = index;

        return true;
    }
}