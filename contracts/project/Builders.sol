// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

contract Builders {
    // Plan designer entity (builder)
    struct Builder {
        address _address;
        bool parity;
        bytes32 publicKey;
    }

    mapping(address => Builder) public builders;

    modifier onlyBuilder {
        require(
            builders[msg.sender]._address != address(0),
            "Only builders are allowed to execute this."
        );
        _;
    }

    /** Builder can update his public key.
        @param parity based on header value (0x02/0x03 - false/true)
        @param publicKey compressed public key value
     */
    function setBuilderPublickey(bool parity, bytes32 publicKey) public {
        require(builders[msg.sender]._address == msg.sender, "Builder not set");
        builders[msg.sender].parity = parity;
        builders[msg.sender].publicKey = publicKey;
    }

    // TODO - add builder function ?
}
