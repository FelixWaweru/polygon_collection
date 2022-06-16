// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/*

+::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::+
=                                                                                        =
=                                                                                        =
=          -*++++++*##++++**++:. :=++*++#++++++++++++++++****+++**#+++++++++++++******-. =
=         =*+++++++*@@*++++++*@@.+++++++%@@++++++++++++++++++++++%@+++++++++++++++++++@% =
=       :*+++++++++*@@*++++++*@@:+++++++%@*+++++++++++++++++++++++@++++++*++++++++++++#@+=
=     .++++++++++++*@@#++++++*@@:+++++++%%+++++#%%%++++++*@@@*++++%#++++#@@##%%%@++++++@@*
=    =*++++++++++++*@@%++++++#@@.=++++++#@+++++%@%*++++++#@@++++++@%++++#@@   :+++++++#@@#
=  .*+++++++**+++++*@@#++++++#@@ :*+++++#@*++++%@%+++++++#@@=+++++%@++++#@@ :++++++++#@@*=
= :*+++++++%@#+++++*@@*++++++%@% .*+++++*@%+#**%@%*++++++%@%-++**#@@#=%%%%@++++++++*@@@= =
=.*++++++*@@@#+++++*@@+++++++@@*  #++++++@@::-=+*+*++++++%@% -=@%#*=-   .++++++++*%@@*.  =
=*+++++++@@@:*+++++*@@+++++++@@=  *++++++@@=      *++++++#@%           =*++++++*%@@#:    =
#*++++++@@@. ++++++*@%++++++*@@-  *++++++%@+      *++++++#@%         :*++++++*%@@*.      =
%++++++*@@-  =+++++*@#++++++*@@.  *++++++#@#      +++++++*@@        =*++++++#@@@*+==-:   =
#*++++++@@    .=%%%%%*++++++*@@.  *++++++#@%      ++++++++@@:      =+++++++%@@=*+++++#%*.=
=*++++++#@-         :*+++++++@@:  #++++++#@@      =+++++++%@=     :*++++++%@@- #+++++@@% =
=:*+++++++*=-----=+*+#+++++++*@*:++++++++#@@     :=*++++++*##.    =+++++++@@*--*+++++@@+ =
= :*++++++++++++++++%@#++++++++++++++++++@@%    -+++++++++++*@@   =++++++++++++++++++@@- =
=   =*++++++++++++++*@@+*++++++++++++++#@@@:    .*++++++++++*@@    *+++++++++++++++++@@- =
=     -+**++++++++**#@@-.-**+++++++*#%@@@+       *+***######%@@    =++++**##%%%%%%%%%@@- =
=       .-*#%@@@@@%%#+=:   .=*#%@@@@%*+:         ..%%#**++=====     -=@@%#*+=--::...::-. =
=                                                                                        =
=                                                                                        =
+::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::+ 

 * @title CUTZ contract
 * @dev Extends ERC721 Non-Fungible Token Standard basic implementation
 * Created by Felix Waweru aka Whyweru                                                                                                     
 */

contract CUTZ is ERC721, Ownable {
    using SafeMath for uint256;
    using Strings for uint256;

    string public baseURI;
    uint256 public charachterPrice;
    uint256 public MAX_CHARACHTERS;

    uint256 public mintedSupply;
    uint256 public reservedSupply;
    uint256 public totalSupply;

    uint256 public maxCharacterPerWallet;
    uint256 public maxCharacterPurchase;

    bool public saleIsActive = false;
    bool public burnIsActive = false;

    // address public constant creatorAddress = 0x8B913B9385Bb118Ec20c27D4E5376288bf53b0Bd;
    // Testing Wallet Address
    address public constant creatorAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    constructor(uint256 maxNftSupply) ERC721("Cutz", "CUTZ") {
        MAX_CHARACHTERS = maxNftSupply;
        charachterPrice = 0; //0.0 ETH
        maxCharacterPerWallet = 20;
        maxCharacterPurchase = 10;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }

    function withdraw() public onlyOwner {
        payable(creatorAddress).transfer(address(this).balance);
    }

    /**
     * Set some CUTZ Charachters aside
     */
    function reserveCharachters(uint256[] memory reserve) public onlyOwner {
        require(totalSupply + reserve.length <= MAX_CHARACHTERS, "sold out");

        for (uint256 i = 0; i < reserve.length; i++) {
            require(!_exists(reserve[i]) && reserve[i] > 0 && reserve[i] <= MAX_CHARACHTERS, "token already minted");
            reservedSupply++;
            _safeMint(msg.sender, reserve[i]);
        }
        totalSupply += reserve.length;
    }

    function setBaseURI(string memory _base) public onlyOwner {
        baseURI = _base;
    }

    function setMaxCharacterPurchase(uint256 _buylimit) public onlyOwner {
        maxCharacterPurchase = _buylimit;
    }
    
    function setMaxCharachterPerWallet(uint256 _limit) public onlyOwner {
        maxCharacterPerWallet = _limit;
    }

    /*
    * Pause sale if active, make active if paused
    */
    function setSaleState(bool _state) public onlyOwner {
        saleIsActive = _state;
    }

    /*
    * Pause burn if active, make active if paused
    */
    function setBurnState(bool _state) public onlyOwner {
        burnIsActive = _state;
    }

    /**
    * Mints CUTZ Charachters
    */
    function mintCutz(uint256 numberOfTokens) public payable {
        require(saleIsActive, "minting disabled");
        require(numberOfTokens <= maxCharacterPurchase, "max mints exceeded");
        require(totalSupply + numberOfTokens <= MAX_CHARACHTERS, "max tokens exceeded");
        require(msg.value >= 0, "incorrect mint value sent");//Free Mint

        for(uint256 i = 0; i < numberOfTokens; i++) {
            uint256 newTokenID = mintedSupply + 1;
            require(!_exists(newTokenID), "token already minted");
            mintedSupply++;
            _safeMint(msg.sender, newTokenID);
        }
        totalSupply += numberOfTokens;
    }

    /**
    * Burns CUTZ Charachters
    */
    function burn(uint256 tokenId) public{
        require(burnIsActive, "burning disabled");
        _burn(tokenId);
    }
}