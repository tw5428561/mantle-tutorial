async function main() {
    console.log("l2 deploy test")

    const l2Greeter = await ethers.getContractFactory("Greeter");

    console.log('deploying l2Greeter to', hre.network.name)

    const l2GreeterContract = await l2Greeter.deploy("l2 greeting!");                                      // L1 token

    console.log("L2 Greeter deployed to:", l2GreeterContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
