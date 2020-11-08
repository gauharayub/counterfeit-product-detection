// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "./Ownable.sol";


contract Counterfeit is Ownable {

    constructor(){
        products.push(Product(0, 0, 'dummy', 'dummy', true));
        sellerId++;
        sellers.push(sellerDetails(sellerId,0,"owner","originalOwner"));
        sellerAddressToSellerId[owner()] = sellerId;
        sellerIdToSellerIndex[sellerId] = sellers.length -1;
    }

    //---------------------------------------//
    //----------------Events----------------//
    //--------------------------------------//

    event productAdded(address productOwner);
    event sellerReported(address sellerAddress);
    event sellerUnblocked(address sellerAddress);
    event productPurchased(address buyerAddress);
    event productSold(address sellerAddress);
    event sellerRegistered(address sellerAddress);
    // event sellerIs(uint id,string name,string details);
    // event productIs(string name, uint price, string details, bool isSold);
    //------------------------------------//
    //------------Variables---------------//
    //------------------------------------//

    uint256 sellerId = 1000;
    uint256 reportThreshold = 100;

    //------------------------------------//
    //------------Variables End-----------//
    //------------------------------------//

    //------------------------------------//
    //--------------Structs---------------//
    //------------------------------------//

    struct Product {
        uint256 productId;
        uint256 price;
        string name;
        string details;
        bool isSold;
    }

    struct sellerDetails {
        uint256 id;
        uint256 reportCount;
        string name;
        string details;
    }

    //------------------------------------//
    //------------Structs End-------------//
    //------------------------------------//

    //------------------------------------//
    //--------------Arrays----------------//
    //------------------------------------//

    Product[] private products;
    sellerDetails[] private sellers;

    //------------------------------------//
    //------------Arrays End--------------//
    //------------------------------------//

    //------------------------------------//
    //--------------Mappings--------------//
    //------------------------------------//

    mapping(address => uint256) sellerAddressToSellerId;
    mapping(uint256 => uint256) sellerIdToSellerIndex;
    mapping(uint256 => bool) productIdUsedForReport;

    //tells who is the owner of product
    mapping(uint256 => address) private productToOwner;

    mapping(uint256 => uint256)  private productIdToProductIndex;

    mapping(uint256 => uint256) private secretIdToProductIndex;

    //who owns how many product
    mapping(address => uint256) private ownerProductCount;

    //------------------------------------//
    //-------------Mappings End-----------//
    //------------------------------------//

    //------------------------------------//
    //-------------Modifiers--------------//
    //------------------------------------//

    modifier sellerCheck(uint256 _productId) {
        // check if the seller owns the product or not...
        address productOwner = productToOwner[_productId];
        require(msg.sender == productOwner);
        _;
    }

    modifier soldCheck(uint256 _productId) {
        // finding product index
        uint256 productIndex = productIdToProductIndex[_productId];

        // finding product from index
        bool isSold = products[productIndex].isSold;

        require(isSold == false);
        _;
    }

    //------------------------------------//
    //-----------Modifiers End------------//
    //------------------------------------//

    //------------------------------------//
    //------------Functions---------------//
    //------------------------------------//




    function unblockSeller (address _sellerAddress) onlyOwner external returns (bool){
        uint sellerIndex = returnSellerIndex(_sellerAddress);
        sellers[sellerIndex].reportCount = 0;
        emit sellerUnblocked(_sellerAddress);
        return true; 
    }

    function returnSellerIndex(address _sellerAddress) internal view returns(uint){
        require(sellerAddressToSellerId[msg.sender] != 0);

        uint seller_Id = sellerAddressToSellerId[_sellerAddress];
        return sellerIdToSellerIndex[seller_Id];
    }

    function registerSeller (string memory _name, string memory _details) external {

        //checking seller is not registered before
        require(sellerAddressToSellerId[msg.sender] == 0);

        //increase random id
        sellerId++;

        //creating new instance and storing in array
        sellerDetails memory sDet = sellerDetails(sellerId,0,_name,_details);
        sellers.push(sDet);
        uint sellerIndex = sellers.length - 1;

        //assingning index for future search
        sellerIdToSellerIndex[sellerId] = sellerIndex;
        sellerAddressToSellerId[msg.sender] = sellerId;

        emit sellerRegistered(msg.sender);
    }

    function registerReport(uint _productId) external returns(bool) {
        //one product is used once to report
        require(productIdUsedForReport[_productId] == false);

        address productOwner = productToOwner[_productId];
       
        uint sellerIndex = returnSellerIndex(productOwner);

        sellers[sellerIndex].reportCount++;

        productIdUsedForReport[_productId] = true;

        emit sellerReported(productOwner);

        return true;

    }

    // should be called by consumers
    function buyProduct(uint _secretId) external returns(bool) {
        // finding product index using secret id from the in the common storage...
        uint productIndex = secretIdToProductIndex[_secretId];
        
        // productId from product
        uint productId = products[productIndex].productId;

        // product current owner from productId 
        address productOwner = productToOwner[productId];

        require(ownerProductCount[productOwner] > 0);

        //not able to sell if blocked
        uint sellerIndex = returnSellerIndex(productOwner);
        require(sellers[sellerIndex].reportCount < reportThreshold);
        require(products[productIndex].isSold == false);

        // marking product as soldi i.e. bought by consumer
        products[productIndex].isSold = true;

        // reducing owner count
        ownerProductCount[productOwner]--;

        emit productPurchased(msg.sender);

        return true;
    }

    // should be called for reselling
    function sellProduct(uint _productId, address _buyerAddress) external sellerCheck(_productId)
    soldCheck(_productId) returns(bool) {
        // checking for limit
        //cannot sell to himself
        require(msg.sender != _buyerAddress);
        require(ownerProductCount[msg.sender] > 0);

        //buyer must be registered
        require(sellerAddressToSellerId[_buyerAddress] != 0);

        //if reports greater than certain threshold block them
        uint buyerIndex = returnSellerIndex(_buyerAddress);
        require(sellers[buyerIndex].reportCount < reportThreshold);
        
        // changing owner of product here
        productToOwner[_productId] = _buyerAddress;

        // changing limit
        ownerProductCount[msg.sender]--;
        ownerProductCount[_buyerAddress]++;

        emit productSold(msg.sender);
        
        return true;
    }




    function addProduct(uint _productId, uint _secretId, uint _price, string memory _name, 
    string memory _details) onlyOwner external returns(bool) {

        // checking that both product and secret ids are not used before
        require(productIdToProductIndex[_productId] == 0);
        require(secretIdToProductIndex[_secretId] == 0);
        
        //assigning owner to the one who initiated the call...
        productToOwner[_productId] = msg.sender;
        ownerProductCount[msg.sender]++;        

        //addint product to products array
        products.push(Product(_productId, _price, _name, _details, false));
        uint index = products.length - 1;

        //setting index in mappings

var cf = await Counterfeit.deployed()

var accounts;
web3.eth.getAccounts(function(err,res) { accounts = res; });

var second = accounts[1]

cf.addProduct(1,1,20,'first','first')

cf.registerSeller('gak','marwadi',{from:second})
        productIdToProductIndex[_productId] = index;
        secretIdToProductIndex[_secretId] = index;

        emit productAdded(msg.sender);

        return true;
    }


    function whoIsSeller(uint _productId) external view returns (uint id,string memory name,string memory details) {
        address sellerAddress = productToOwner[_productId];
        uint sellerIndex = returnSellerIndex(sellerAddress);

        sellerDetails storage seller = sellers[sellerIndex];
        return (seller.id,seller.name,seller.details);
    }

    function whatIsProduct(uint _productId) external view returns (string memory name, uint price, string memory details, bool isSold){
        uint index = productIdToProductIndex[_productId];

        Product storage tP = products[index];
        return (tP.name,tP.price,tP.details,tP.isSold);
    }
    //------------------------------------//
    //----------Functions End-------------//
    //------------------------------------//
}
