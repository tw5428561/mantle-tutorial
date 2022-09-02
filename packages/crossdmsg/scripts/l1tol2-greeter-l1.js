async function main() {
    console.log("l1 to l2 msg sending")
    let Controller = await ethers.getContractFactory("FromL1_ControlL2Greeter")
    let controller = await Controller.deploy()
    console.log("FromL1_ControlL2Greeter address",controller.address)
    let tx = await controller.setGreeting(`Message from L1 to L2`)
    let rcpt = await tx.wait()
    console.log(rcpt)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
