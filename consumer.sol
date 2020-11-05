// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "./Ownable.sol";
import "./CommonStorage.sol";
import "./Seller.sol";

///@dev file for consumer methods inherited by other contracts

contract Consumer is Ownable{

    // Contract compostion to interact with features of other contracts..
    CommonStorage Store;
    Seller sellerStore;

    // initialize store variables with their respective addresses...
    constructor (address _store, address _seller) public {
        Store  = CommonStorage(_store);
        sellerStore = Seller(_seller);
    }

    function reportSeller(uint _productId) external {
        // get address of product owner..
        address productOwner = Store.productToOwner[_productId];
        // get the product owner of type sellerDetails..
        sellerStore.sellerDetails currentSeller;
        currentSeller = sellerStore.sellerDetails(productOwner);
        
        // increment report-count of seller..
        currentSeller.reportCount++;
    }
    
}