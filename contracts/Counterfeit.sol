// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;
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

    uint256 private sellerId = 1000;
    uint256 private reportThreshold = 100;

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
        require(msg.sender == productOwner,"You do not own this product");
        _;
    }

    modifier soldCheck(uint256 _productId) {
        // finding product index
        uint256 productIndex = productIdToProductIndex[_productId];

        // finding product from index
        bool isSold = products[productIndex].isSold;

        require(isSold == false,"product is already sold");
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
        require(sellerAddressToSellerId[msg.sender] != 0,"Seller not found");

        uint seller_Id = sellerAddressToSellerId[_sellerAddress];
        return sellerIdToSellerIndex[seller_Id];
    }

    function registerSeller (string memory _name, string memory _details) external returns(string memory status ) {

        //checking seller is not registered before
        require(sellerAddressToSellerId[msg.sender] == 0,"You are already registered");

        //increase random id
        sellerId++;

        //creating new instance and storing in array
        sellers.push(sellerDetails(sellerId,0,_name,_details));

        //assingning index for future search
        sellerIdToSellerIndex[sellerId] = sellers.length - 1;
        sellerAddressToSellerId[msg.sender] = sellerId;

        return "Seller registered successfully";
        // emit sellerRegistered(msg.sender);
    }

    function registerReport(uint _productId) external returns(bool) {
        //one product is used once to report
        require(productIdUsedForReport[_productId] == false,"this key is already reported");

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

        require(ownerProductCount[productOwner] > 0,"Owner does not own the product");

        //not able to sell if blocked
        uint sellerIndex = returnSellerIndex(productOwner);
        
        require(products[productIndex].isSold == false,"Secret id is scanned before");

        // marking product as soldi i.e. bought by consumer
        products[productIndex].isSold = true;

        // reducing owner count
        ownerProductCount[productOwner]--;

        emit productPurchased(msg.sender);

        return true;
    }

    function getAllProducts(address _ownerAddress) external view returns(Product[] memory){
        
        uint productCount = ownerProductCount[_ownerAddress];

        // push method not available for memory array...
        Product[] memory ownedProducts = new Product[](productCount);
        uint j=0;

        for(uint i=0; i < products.length; i++) {
            if(productToOwner[products[i].productId] == _ownerAddress) {
                ownedProducts[j] = products[i];
                j++;
            }
        }

        return ownedProducts;
        
    }

    // should be called for reselling
    function sellProduct(uint _productId, address _buyerAddress) external sellerCheck(_productId)
    soldCheck(_productId) returns(bool) {
        // checking for limit
        //cannot sell to himself
        require(msg.sender != _buyerAddress,"Sender can not be buyer");
        require(ownerProductCount[msg.sender] > 0,"Owner owns 0 product");

        //buyer must be registered
        require(sellerAddressToSellerId[_buyerAddress] != 0,"Buyer must be registered as a seller");

        //if reports greater than certain threshold block them
        uint buyerIndex = returnSellerIndex(_buyerAddress);
        require(sellers[buyerIndex].reportCount < reportThreshold,"The account is blocked");
        
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
        require(productIdToProductIndex[_productId] == 0,"Product id is used before");
        require(secretIdToProductIndex[_secretId] == 0,"Secret id is used before");
        
        //assigning owner to the one who initiated the call...
        productToOwner[_productId] = msg.sender;
        ownerProductCount[msg.sender]++;       

        //addint product to products array
        products.push(Product(_productId, _price, _name, _details, false));
        uint index = products.length - 1;

        //setting index in mappings
        productIdToProductIndex[_productId] = index;
        secretIdToProductIndex[_secretId] = index;

        emit productAdded(msg.sender);

        return true;
    }


    function productSeller(uint _productId) external view returns (uint id,string memory name,string memory details) {
        address sellerAddress = productToOwner[_productId];
        uint sellerIndex = returnSellerIndex(sellerAddress);
        
        require(sellers[sellerIndex].reportCount < reportThreshold,"seller is blocked");

        sellerDetails storage seller = sellers[sellerIndex];
        return (seller.id,seller.name,seller.details);
    }

    function productDetails(uint _productId) external view returns (string memory name, uint price, string memory details, bool isSold){
        uint index = productIdToProductIndex[_productId];
        Product storage tP = products[index];
        return (tP.name,tP.price,tP.details,tP.isSold);
    }
    //------------------------------------//
    //----------Functions End-------------//
    //------------------------------------//

    //------------------------------------//
    //----------Dev Only Owner-------------//
    //------------------------------------//
    function productLength() onlyOwner public view returns (uint _productArrayLength){
        return products.length;
    }

    function sellersLength() onlyOwner public view returns (uint _sellerArrayLength){
        return sellers.length;
    }
    //------------------------------------//
    //--------Dev Only Owner End----------//
    //------------------------------------//
}
