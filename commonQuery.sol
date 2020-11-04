pragma solidity >=0.7.0;

import "./ownable.sol";

///@dev file for common methods inherited by other contracts

contract CommonQuery is Ownable{

    struct Product{
        uint productId;
        uint price;
        string name;
        string details;
        bool isSold;
    }

    Product[] internal products;

    //tells who is the owner of product 
    mapping (uint => address) public productToOwner;

    //maps product id to array index
    mapping(uint => uint) productIdToProductIndex;
    
    //maps secretId to product array index
    mapping(uint => uint) secretIdToProductIndex;


    //who owns how many product 
    mapping (address => uint) productOwnerCount;

}