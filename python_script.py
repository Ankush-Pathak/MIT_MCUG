from web3 import Web3, HTTPProvider, IPCProvider
from web3.contract import ConciseContract
import json

#enode = str()
contract_address = str('0xe0ad64ceb1c3f8ee402b979af9193cd31084a6f8')
web3 = Web3(HTTPProvider("http://localhost:30304"))
#web3.admin.addPeer()
abiDef = json.loads('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
contract_instance = web3.eth.contract(abiDef, contract_address, ContractFactoryClass=ConciseContract)
web3.personal.unlockAccount(web3.eth.accounts[0], "pass1234", 3600)
#contract_instance.voteForCandidate("A", transact={'from':web3.eth.accounts[0]})
votes = contract_instance.totalVotesFor("A")
print(votes)
