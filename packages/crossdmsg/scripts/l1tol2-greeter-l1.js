async function main() {
    console.log("l1 to l2 msg sending")

    Greeter = await ethers.getContractFactory("Greeter")
    greeter = await Greeter.attach("0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650")
    await greeter.greet()

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
