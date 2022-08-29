async function main() {
    console.log("l1 to l2 msg sending")

    Controller = await ethers.getContractFactory("FromL1_ControlL2Greeter")
    controller = await Controller.deploy()
    tx = await controller.setGreeting(`Hello from L1 ${Date()}`)
    rcpt = await tx.wait()

    console.log("FromL1_ControlL2Greeter address",controller.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
