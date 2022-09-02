//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { ICrossDomainMessenger } from"@bitdaoio/contracts/libraries/bridge/ICrossDomainMessenger.sol";

contract FromL2_ControlL1Greeter {
    address crossDomainMessengerAddr = 0x4200000000000000000000000000000000000007;
    address greeterL1Addr = 0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf;
    function setGreeting(string calldata _greeting) public {
        bytes memory message = abi.encodeWithSignature("setGreeting(string)", _greeting);
        ICrossDomainMessenger(crossDomainMessengerAddr).sendMessage(
            greeterL1Addr,
            message,
            1000000
        );
    }
}
