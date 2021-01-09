// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;
import "./Ownable.sol";

//register owner as seller first

contract Counterfeit is Ownable {

    constructor(){
        products.push(Product(0, 0, 'dummyProduct', true));
        sellers.push(sellerDetails(0,"dummySeller","dummySeller"));
    }

    //----------------Events----------------//

    event productAdded(address productOwner);
    event sellerReported(address sellerAddress);
    event sellerUnblocked(address sellerAddress);
    event productPurchased(address buyerAddress);
    event productSold(address sellerAddress);
    event sellerRegistered(address sellerAddress);
    // event allProducts(string owner);
    // event sellerIs(uint id,string name,string details);
    // event productIs(string name, uint price, string details, bool isSold);
    //------------Variables---------------//

    uint256 private reportThreshold = 100;

    //------------Variables End-----------//

    //--------------Structs---------------//

    struct Product {
        uint256 productId;
        uint256 price;
        string name;
        bool isSold;
    }

    struct sellerDetails {
        uint256 reportCount;
        string name;
        string details;
    }

    //------------Structs End-------------//

    //--------------Arrays----------------//

    Product[] private products;
    sellerDetails[] private sellers;

    //------------Arrays End--------------//

    //--------------Mappings--------------//

    mapping(address => uint256) sellerAddressToSellerIndex;

    //tells who is the owner of product
    mapping(uint256 => uint256)  private productIdToProductIndex;
    mapping(uint256 => uint256) private secretIdToProductIndex;

    //who owns how many product
    mapping(address => uint256) private ownerProductCount;
    mapping(uint256 => bool) productIdUsedForReport;
    mapping(uint256 => address) private productToOwner;

    // //all products of a seller
    // mapping(address => Product[]) internal allProd;

    //-------------Mappings End-----------//

    //-------------Modifiers--------------//

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

    //-----------Modifiers End------------//

    //------------Functions---------------//

    function unblockSeller (address _sellerAddress) onlyOwner external returns (bool){
        uint sellerIndex = sellerAddressToSellerIndex[_sellerAddress];
        sellers[sellerIndex].reportCount = 0;
        emit sellerUnblocked(_sellerAddress);
        return true; 
    }


    function registerSeller (string memory _name, string memory _details) external returns(string memory status ) {

        //checking seller is not registered before
        require(sellerAddressToSellerIndex[msg.sender] == 0,"You are already registered");

        //creating new instance and storing in array
        sellers.push(sellerDetails(0,_name,_details));

        //assingning index for future search
        sellerAddressToSellerIndex[msg.sender] = sellers.length - 1;

        return "Seller registered successfully";
        // emit sellerRegistered(msg.sender);
    }

    function registerReport(uint _productId) external returns(bool) {
        //one product is used once to report
        require(productIdUsedForReport[_productId] == false,"this key is already reported");

        address productOwner = productToOwner[_productId];
       
        uint sellerIndex = sellerAddressToSellerIndex[productOwner];

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

        require(ownerProductCount[productOwner] > 0,"You do not own the product");

        require(products[productIndex].isSold == false,"Secret id is scanned before");

        // marking product as soldi i.e. bought by consumer
        products[productIndex].isSold = true;
        productToOwner[productId] = address(0);
        // reducing owner count
        ownerProductCount[productOwner]--;

        emit productPurchased(msg.sender);

        return true;
    }

    function getAllProducts() public view returns(Product[] memory){
        
        uint productCount = ownerProductCount[msg.sender];
        require(productCount>0,"No products");

        // push method not available for memory array...
        Product[] memory ownedProducts = new Product[](productCount);
        uint j=0;

        for(uint i=0; i < products.length; i++) {
            if(productToOwner[products[i].productId] == msg.sender) {
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
        require(msg.sender != _buyerAddress,"You already own this product");
        require(ownerProductCount[msg.sender] > 0,"You own 0 product");

        //buyer must be registered
        require(sellerAddressToSellerIndex[_buyerAddress] != 0,"Buyer is not registered as a seller");

        //if reports greater than certain threshold block them
        uint buyerIndex = sellerAddressToSellerIndex[_buyerAddress];
        require(sellers[buyerIndex].reportCount < reportThreshold,"The account is blocked");
        
        // ---- block checking for seller is left??

        // changing owner of product here
        productToOwner[_productId] = _buyerAddress;

        // changing limit
        ownerProductCount[msg.sender]--;
        ownerProductCount[_buyerAddress]++;

        emit productSold(msg.sender);
        
        return true;
    }


    function addProduct(uint _productId, uint _secretId, uint _price, string memory _name) onlyOwner external returns(bool) {

        // checking that both product and secret ids are not used before
        require(productIdToProductIndex[_productId] == 0,"Product id is used before");
        require(secretIdToProductIndex[_secretId] == 0,"Secret id is used before");
        
        //assigning owner to the one who initiated the call...
        productToOwner[_productId] = msg.sender;
        ownerProductCount[msg.sender]++;        

        //addint product to products array
        products.push(Product(_productId, _price, _name, false));
        
        // allProd[msg.sender].push(Product(_productId, _price, _name, _details, false));
        //setting index in mappings
        productIdToProductIndex[_productId] = products.length - 1;
        secretIdToProductIndex[_secretId] = products.length - 1;

        emit productAdded(msg.sender);

        return true;
    }


    function productSeller(uint _productId) external view returns (string memory name,string memory details) {
        address sellerAddress = productToOwner[_productId];
        uint sellerIndex = sellerAddressToSellerIndex[sellerAddress];
        
        require(sellers[sellerIndex].reportCount < reportThreshold,"seller is blocked");

        sellerDetails memory seller = sellers[sellerIndex];
        return (seller.name,seller.details);
    }

    function productDetails(uint _productId) external view returns (string memory name, uint price, bool isSold){
        uint index = productIdToProductIndex[_productId];
        Product memory tP = products[index];
        return (tP.name,tP.price,tP.isSold);
    }
    //----------Functions End-------------//

    //----------Dev Only Owner-------------//

    function productLength() onlyOwner public view returns (uint _productArrayLength){
        return products.length;
    }

    function sellersLength() onlyOwner public view returns (uint _sellerArrayLength){
        return sellers.length;
    }

    function registerOwnerAsSeller (string memory _name, string memory _details) onlyOwner external returns(string memory status ) {

        //checking seller is not registered before
        require(sellerAddressToSellerIndex[msg.sender] == 0,"You are already registered");

        //creating new instance and storing in array
        sellers.push(sellerDetails(0,_name,_details));

        //assingning index for future search
        sellerAddressToSellerIndex[msg.sender] = sellers.length - 1;

        return "Seller registered successfully";
        // emit sellerRegistered(msg.sender);
    }
    //--------Dev Only Owner End----------//
}
