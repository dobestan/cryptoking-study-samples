// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Hello {
    string public message;
    address private _owner;

    constructor(string memory initialMessage) {
        message = initialMessage;
        _owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function setMessage(string memory newMessage) public onlyOwner {
        message = newMessage;
    }

    modifier onlyOwner() {
        require(
            _owner == msg.sender,
            "Only owner can change a message."
        );
        _;    
    }
}
