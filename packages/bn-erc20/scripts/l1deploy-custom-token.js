async function main() {
  const l1CustomERC20Factory = await ethers.getContractFactory("L1CustomERC20");
  console.log('deploying L1CustomERC20 to', hre.network.name)
  const l1CustomERC20 = await l1CustomERC20Factory.deploy();                                      // L1 token
  console.log("L1 CustomERC20 deployed to:", l1CustomERC20.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
