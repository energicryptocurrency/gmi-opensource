// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract NFTUpgradeable is ERC721Upgradeable {
    uint256 private currentTokenId;

    function initialize() external initializer {
        __ERC721_init("NFTTutorial", "NFT");
    }

    function mintTo(address recipient) public returns (uint256) {
        currentTokenId++;
        uint256 newItemId = currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
