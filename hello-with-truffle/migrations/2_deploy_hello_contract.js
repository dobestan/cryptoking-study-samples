const Hello = artifacts.require('Hello');


module.exports = (deployer) => {
    deployer.deploy(Hello, "hello world");
}
