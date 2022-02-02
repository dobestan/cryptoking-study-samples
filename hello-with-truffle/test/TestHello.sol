// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Hello.sol";


contract TestHello {
    Hello hello = Hello(DeployedAddresses.Hello());

    function testContractAddress() public {
        Assert.notEqual(
            address(hello),
            address(0),
            "should have a own address."
        );
    }

    function testContractMessage() public {
        Assert.equal(
            hello.message(),
            "hello world",
            "should have a message."
        );
    }

    // #TODO: should test with multiple accounts.
    // should work when owner sends a tx.
    // should NOT work when NOT owner sends a tx.
}
