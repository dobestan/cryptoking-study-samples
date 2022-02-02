const Hello = artifacts.require('Hello');


let hello;


contract("Hello", (accounts) => {
    before(async () => {
        console.log("before");
        hello = await Hello.deployed();
    });

    it('should have a own address.', () => {
        assert.ok(hello.address);
    });

    it('should have a message.', async () => {
        assert.equal(
            "hello world",
            await hello.message()
        );
    });

    describe('setMessage function', () => {
        it('should work when owner sends a tx.', async () => {
            const newMessage = "this is new message";
            await hello.setMessage(newMessage, {from: accounts[0], gas: 1000000});
            assert.equal(
                newMessage,
                await hello.message()
            );
        });

        it('should NOT work when NOT owner sends a tx.', async () => {
            const newMessage = "this is new message";
            try {
                await hello.setMessage(newMessage, {from: accounts[1], gas: 1000000});
            } catch (error) {
                assert.ok(error);
            }
        });
    });
});
