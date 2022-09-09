import { getSigners } from '../utils/setup'
import { Greeter__factory, FromL1_ControlL2Greeter__factory, FromL2_ControlL1Greeter__factory } from '../typechain-types'

import dotenv from "dotenv";
dotenv.config();

async function main() {

  let [l1Signer, l2Signer] = await getSigners()

  let l1Greeter = await new Greeter__factory(l1Signer).deploy("l1 default messages!");
  await l1Greeter.deployed();
  console.log("L1Greeter_Address=%s", l1Greeter.address)
  
  let l2Greeter = await new Greeter__factory(l2Signer).deploy("l2 default messages!");
  await l2Greeter.deployed();
  console.log("L2Greeter_Address=%s", l2Greeter.address)

  let fromL1_ControlL2Greeter = await new FromL1_ControlL2Greeter__factory(l1Signer).deploy(process.env.L1_CROSS_DOMAIN_MESSENGER!, l2Greeter.address);
  await fromL1_ControlL2Greeter.deployed();
  console.log("FromL1_ControlL2Greeter_Address=%s", fromL1_ControlL2Greeter.address)

  let fromL2_ControlL1Greeter = await new FromL2_ControlL1Greeter__factory(l2Signer).deploy(process.env.L2_CROSS_DOMAIN_MESSENGER!, l1Greeter.address);
  await fromL2_ControlL1Greeter.deployed();
  console.log("FromL2_ControlL1Greeter_Address=%s", fromL2_ControlL1Greeter.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
