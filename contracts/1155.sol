// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AirdropERC1155 is ERC1155, Ownable {
    mapping(uint256 => string) private _tokenURIs;

    error MismatchedInputLengths();
    error CallerNotAllowedToBurn();

    address private _burner;

    constructor() ERC1155("") {
        // Initialize fake metadata for token IDs 1 through 10
        _tokenURIs[1] = "https://example.com/metadata/1";
        _tokenURIs[2] = "https://example.com/metadata/2";
        _tokenURIs[3] = "https://example.com/metadata/3";
        _tokenURIs[4] = "https://example.com/metadata/4";
        _tokenURIs[5] = "https://example.com/metadata/5";
        _tokenURIs[6] = "https://example.com/metadata/6";
        _tokenURIs[7] = "https://example.com/metadata/7";
        _tokenURIs[8] = "https://example.com/metadata/8";
        _tokenURIs[9] = "https://example.com/metadata/9";
        _tokenURIs[10] = "https://example.com/metadata/10";
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    // Airdrop function to distribute tokens to multiple addresses
    function airdrop(address[] calldata recipients, uint256[] calldata tokenIds) external onlyOwner {
        if(recipients.length != tokenIds.length){
            revert MismatchedInputLengths();
        }
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], tokenIds[i], 1, "");
        }
    }
    function setBurnerAddress(address burner) external onlyOwner {
        _burner = burner;
    }

    function burn(address sender, uint256 tokenId) external {
        if(msg.sender != _burner){
            revert CallerNotAllowedToBurn();
        }
        _burn(sender, tokenId, 1);
    }

    // Function to set or update metadata URI for a specific token ID
    function setTokenURI(uint256 tokenId, string calldata URI) external onlyOwner {
        _tokenURIs[tokenId] = URI;
    }
}
