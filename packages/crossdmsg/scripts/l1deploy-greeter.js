async function main() {
    console.log("l1 deploy test")


    const l1Greeter = await ethers.getContractFactory("Greeter");

    console.log('deploying l1Greeter to', hre.network.name)

    const l1GreeterContract = await l1Greeter.deploy("l1 message greeting!");                                      // L1 token

    console.log("L1 Greeter deployed to:", l1GreeterContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
