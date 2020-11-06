// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "./Ownable.sol";

///@dev file for common methods inherited by other contracts

contract CommonStorage is Ownable {

    struct Product{
        uint productId;
        uint price;
        string name;
        string details;
        bool isSold;
    }

    Product[] public products;

    //tells who is the owner of product 
    mapping (uint => address) public productToOwner;

    //maps product id to array index
    mapping (uint => uint) public productIdToProductIndex;
    
    //maps secretId to product array index
    mapping (uint => uint) public secretIdToProductIndex;

    //who owns how many product 
    mapping (address => uint) public productOwnerCount;

}