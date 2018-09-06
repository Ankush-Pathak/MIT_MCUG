Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.103:30304"));
console.log("\n-------------------------------\n");
console.log("\nPassword: " + process.argv[4]);
web3.personal.unlockAccount(web3.eth.accounts[0], "pass1234", 3600);
console.log("\nUnlocked account for an hour\n");
console.log("\nCompiling and deploying code\n");
fs = require('fs')
code = fs.readFileSync("Voting.sol");
solc = require("solc")
compiledCode = solc.compile(code.toString())
console.log("compiledCode: " + compiledCode.contracts.toString() + " code: " + code);
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode
bN = web3.eth.blockNumber
deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: '0x'+byteCode, from: web3.eth.accounts[0], gas: 4700000})
sleep = require('sleep')
contractInstance = VotingContract.at(deployedContract.address)
console.log("\nRequested contract deployment, waiting for it to be deployed... : " + deployedContract.address + " transactionHash: " + deployedContract.transactionHash + " bytecode" + byteCode);
i = 0
while (web3.eth.blockNumber - bN < 5)
{
  if(web3.eth.getTransactionReceipt(deployedContract.transactionHash) != null)
  	console.log(" address: " + web3.eth.getTransactionReceipt(deployedContract.transactionHash).contractAddress + " len: " + deployedContract.address + " i: " + i + " noOfBlocks: " + (web3.eth.blockNumber - bN));
  	
  else
  	console.log(" address: " + web3.eth.getTransactionReceipt(deployedContract.transactionHash) + " len: " + deployedContract.address + " i: " + i + " noOfBlocks: " + (web3.eth.blockNumber - bN));
  i = i + 1
  sleep.msleep(3000)
}
console.log("Address: " + deployedContract.address)
