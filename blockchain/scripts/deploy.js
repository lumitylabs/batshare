async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const QuadraticFunding = await ethers.deployContract("QuadraticFunding");
  
    console.log("Token address:", await QuadraticFunding.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });