// author: Lucas Oliveira <olivmath@protonmail.com>
// CallCounter version: 0.5.0
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CallCounter {
    uint256 calls;
    address[] callers;
    event newCall(address indexed addr, uint256 id);

    constructor() payable {
        console.log("Call Counter Deployed!");
    }

    function call() public {
        calls += 1;
        callers.push(msg.sender);

        emit newCall(msg.sender, calls);
    }

    function getCalls() public view returns (uint256) {
        return calls;
    }

    function getCallers() public view returns (address[] memory) {
        return callers;
    }
}
