// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    // Timelock owns COMBZ governable contracts
    // _minDelay: time before execution
    // _proposers: list of proposers
    // _executors: list of executors
    constructor(
        uint256 _minDelay,
        address[] memory _proposers,
        address[] memory _executors
    ) TimelockController(_minDelay, _proposers, _executors) {}
}
