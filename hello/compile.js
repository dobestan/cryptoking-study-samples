const fs = require('fs');
const path = require('path');

const solc = require('solc');


const helloSourcePath = path.resolve(__dirname, 'contracts', 'hello.sol');
const helloSource = fs.readFileSync(helloSourcePath, 'utf8');


const compileInformation = {
    language: 'Solidity',
    sources: {
        'hello.sol': {
            content: helloSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};


const compiled = JSON.parse(solc.compile(JSON.stringify(compileInformation)));


const bytecode = compiled.contracts['hello.sol']['Hello'].evm.bytecode.object;
const abi = compiled.contracts['hello.sol']['Hello'].abi;


module.exports = { abi, bytecode };
