//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { ICrossDomainMessenger } from "@bitdaoio/contracts/libraries/bridge/ICrossDomainMessenger.sol";

contract FromL1_ControlL2Greeter {
    address crossDomainMessengerAddr = 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318;
    address greeterL2Addr = 0x0B306BF915C4d645ff596e518fAf3F9669b97016;
    function setGreeting(string calldata _greeting) public {
        bytes memory message = abi.encodeWithSignature("setGreeting(string)", _greeting);
        ICrossDomainMessenger(crossDomainMessengerAddr).sendMessage(
            greeterL2Addr,
            message,
            1000000
        );
    }
}

