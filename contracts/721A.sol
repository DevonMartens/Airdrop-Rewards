// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol"; // Adjust import path as necessary
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AirdropERC721A is ERC721A, Ownable {

    mapping(uint256 => string) private _tokenURIs;

    address private _burner;

    // Error messages
    error CallerNotAllowedToBurn();


    constructor() ERC721A("AirdropNFT", "ADNFT") {
        // Initialize with a base URI, if applicable
    }

    // Override _baseURI to integrate with your metadata storage solution
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://example.com/metadata/";
    }

    // Override tokenURI to return the URI for each token
// Override tokenURI to return the URI for each token based on its ID range
function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    string memory base = _baseURI();
    string memory rangeURI;

    if (tokenId <= 0 && tokenId < 101) {
        rangeURI = "range1/";
    } else if (tokenId > 100 && tokenId < 201) {
        rangeURI = "range2/";
    } else if (tokenId > 200 && tokenId < 301) {
        rangeURI = "range3/";
    } else if (tokenId > 300 && tokenId < 401) {
        rangeURI = "range4/";
    } else if (tokenId > 400 && tokenId < 501) {
        rangeURI = "range5/";
    } else if (tokenId > 500 && tokenId < 601) {
        rangeURI = "range6/";
    } else if (tokenId > 600 && tokenId < 701) {
        rangeURI = "range7/";
    } else if (tokenId > 700 && tokenId < 801) {
        rangeURI = "range8/";
    } else if (tokenId > 800 && tokenId < 901) {
        rangeURI = "range9/";
    } else if (tokenId > 900 && tokenId < 1001) {
        rangeURI = "range10/";
    } else {
        revert("Invalid token ID");
    }

    // Concatenate the base URI with the range-specific part
    return string(abi.encodePacked(base, rangeURI));
}

    function setBurnerAddress(address burner) external onlyOwner {
        _burner = burner;
    }

    function burn(uint256 tokenId) external {
         if(msg.sender != _burner){
            revert CallerNotAllowedToBurn();
        }
        _burn(tokenId);
    }


    // Airdrop function to mint NFTs to multiple addresses
    function airdrop(address[] calldata recipients) external onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], 1);
        }
    }
}
