pragma solidity >=0.7.0;

import "./commonQuery.sol";

///@dev file for owner query methods inherited by other contracts

contract ProductOwner is CommonQuery{
  
    function addProduct(uint _productId,uint secretId,uint _price, string memory _name, string memory _details) onlyOwner external returns(bool){
        //checking that both product and secret ids are not used before
        require(productIdToProductIndex[_productId] == 0);
        require(secretIdToProductIndex[_secretId] == 0);
        
        //assigning owner as ownera
        productToOwner[_productId] = msg.sender;
        productOwnerCount[msg.sender]++;
        //creating new struct of product type
        Product currentProduct = new Product(_productId,_price,_name,_details,false);

        //addint product to products array
        uint index = products.push(currentProduct);

        //setting index in mappings
        productIdToProductIndex[_productId] = index;
        secretIdToProductIndex[_secretId] = index;


        return true;
    }
}