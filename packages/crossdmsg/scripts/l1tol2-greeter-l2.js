async function main() {
    console.log("l1 to l2 msg sending")

    Greeter = await ethers.getContractFactory("Greeter")
    greeter = await Greeter.attach("0x0B306BF915C4d645ff596e518fAf3F9669b97016")
    await greeter.greet()
    console.log("message==", await greeter.greet())
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

