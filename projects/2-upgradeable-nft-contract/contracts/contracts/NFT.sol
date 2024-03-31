// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 private currentTokenId;

    constructor() ERC721("NFTTutorial", "NFT") {}

    function mintTo(address recipient) public returns (uint256) {
        currentTokenId++;
        uint256 newItemId = currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
