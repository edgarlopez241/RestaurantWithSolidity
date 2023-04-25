

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
task("accounts", "prints the list of accounts", async (taskArgs,hre)=>{
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts){
    console.log(account.address);
  }
})
module.exports = {
  solidity: "0.8.18",
  defaultNetwork:"sepolia",
  networks:{
  hardhat:{
  },
  sepolia:{
    url: process.env.STAGGING_ALCHEMY_KEY,
    accounts:[process.env.PRIVATE_KEY]
  }
}
};
