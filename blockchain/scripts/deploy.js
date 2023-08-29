async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    const initialSupply = ethers.parseEther("100000000");
    const BatToken = await ethers.deployContract("BatToken",[initialSupply]);
    await BatToken.getAddress()
    console.log("BatToken address:", await BatToken.getAddress());
    const QuadraticFunding = await ethers.deployContract("QuadraticFunding",[BatToken.getAddress()]);

    console.log("QuadraticFunding address:", await QuadraticFunding.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });