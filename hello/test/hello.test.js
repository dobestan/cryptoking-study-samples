const assert = require('assert');

const ganache = require('ganache-cli');
const Web3 = require('Web3');

const { abi, bytecode } = require('../compile');


const web3 = new Web3(ganache.provider());
const initialMessage = "hello world";


let accounts;
let helloContract;


describe('Hello Contract', () => {
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        helloContract = await new web3.eth.Contract(abi)
            .deploy({data: bytecode, arguments: [initialMessage]})
            .send({from: accounts[0], gas: 1000000});
    });

    it('should have a own address.', () => {
        assert.ok(helloContract.options.address);
    });

    it('should have a message.', async () => {
        assert.equal(
            initialMessage,
            await helloContract.methods.message().call()
        );
    });

    describe('setMessage function', () => {
        it('should work when owner sends a tx.', async () => {
            const newMessage = "this is new message";
            await helloContract.methods.setMessage(newMessage).send({from: accounts[0], gas: 1000000});
            assert.equal(
                newMessage,
                await helloContract.methods.message().call()
            );
        });

        it('should NOT work when NOT owner sends a tx.', async () => {
            const newMessage = "this is new message";
            try {
                await helloContract.methods.setMessage(newMessage).send({from: accounts[1], gas: 1000000});
                assert.equal(
                    newMessage,
                    await helloContract.methods.message().call()
                );
            } catch (error) {
                assert.ok(error);
            }
        });
    });
});
