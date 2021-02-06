// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

contract Counterfeit{
    function buyProduct(bytes32 _secretId) external returns(bool) {}
}

contract Buy{
    
    event productPurchased(address buyerAddress);
    event MainContractSet(address mainContractAddress);
    event OwnerChainged(address caller, address newOwner);
    event constructorSet(address owner);

    address private owner;
    Counterfeit C;

    constructor(){
        owner = msg.sender;
        emit constructorSet(owner);
    }
    modifier onlyOwner(){
        require(msg.sender == owner,"You can not set maincontract address");
        _;
    }
    function setMainContract( address _address) onlyOwner external {
        C = Counterfeit(_address);
        emit MainContractSet(_address);
    }
    function changeOwner(address _newOwner) onlyOwner external{
        owner = _newOwner;
        emit OwnerChainged(msg.sender,_newOwner);
    }

    function buyProduct(uint256 _secretId) external {
        bytes32 hash = keccak256(abi.encodePacked(_secretId));
        C.buyProduct(hash);
        emit productPurchased(msg.sender);
    }

}
