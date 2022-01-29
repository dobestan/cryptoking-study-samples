const ganache = require('ganache-cli');
const Web3 = require('Web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const { abi, bytecode } = require('./compile');

const ENDPOINT_URL = "https://rinkeby.infura.io/v3/69fc3a19e66145f9aee1138ae9a3e578";


const provider = new HDWalletProvider(
    process.env.PRIVATE_KEY,
    ENDPOINT_URL,
);
const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("My Address is " + accounts[0]);

    const helloContract = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ["hello world"]})
        .send({from: accounts[0], gas: 1000000});
    console.log("Hello Contract deployed at " + helloContract.options.address);

    // #TODO: should disconnect/close web3 connection.
}
deploy();
