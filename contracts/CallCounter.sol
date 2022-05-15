// author: Lucas Oliveira <olivmath@protonmail.com>
// CallCounter version: 0.4.0
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CallCounter {
    uint256 calls;
    address[] callers;
    event newCall(address indexed caller, uint256 indexCall);

    constructor() payable {
        console.log("Call Counter Deployed!");
    }

    function call() public {
        calls += 1;
        callers.push(msg.sender);
        uint256 reward = 0.1 ether;

        require(
            reward + 1 ether < address(this).balance,
            "Contract not found balance"
        );

        (
            bool success, /*bytes memory data*/

        ) = msg.sender.call{value: reward}("");

        require(success, "Failed send `reward`");

        emit newCall(msg.sender, calls);
    }

    function getCalls() public view returns (uint256) {
        return calls;
    }

    function getCallers() public view returns (address[] memory) {
        return callers;
    }
}
