async function main() {
    console.log("l2 to l1 msg sending")
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
