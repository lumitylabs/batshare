// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract BatToken is ERC20, Ownable {
    mapping(address => bool) public hasReceivedAutoMint;
    
    uint256 public autoMintAmount = 1000 * 10**18; // 1000 tokens, supondo 18 casas decimais

    constructor(uint256 initialSupply) ERC20("BAT", "BAT") {
        _mint(msg.sender, initialSupply);
    }

    function autoMint() public {
        require(!hasReceivedAutoMint[msg.sender], "You have already received auto-mint tokens.");

        _mint(msg.sender, autoMintAmount);
        hasReceivedAutoMint[msg.sender] = true;
    }
}