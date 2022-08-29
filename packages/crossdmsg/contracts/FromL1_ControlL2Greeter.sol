//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";

contract FromL1_ControlL2Greeter {
    address crossDomainMessengerAddr = 0x5086d1eEF304eb5284A0f6720f79403b4e9bE294;
    address greeterL2Addr = 0xC0836cCc8FBa87637e782Dde6e6572aD624fb984;
    function setGreeting(string calldata _greeting) public {
        bytes memory message;
        message = abi.encodeWithSignature("setGreeting(string)",
            _greeting);
        ICrossDomainMessenger(crossDomainMessengerAddr).sendMessage(
            greeterL2Addr,
            message,
            1000000
        );
    }
}
