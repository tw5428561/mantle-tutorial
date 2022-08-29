// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract L1CustomERC20 is ERC20Burnable, Ownable {
    constructor() ERC20("L2CustomERC20", "L1T") Ownable() {
        _mint(msg.sender, 1000000 * 10**18);
    }
}
