const neo4j = require('neo4j-driver').v1;
const config = require(`../config/${process.env.NODE_ENV || 'development'}.env`);
const driver = neo4j.driver(config.url, neo4j.auth.basic(config.username, config.password));
const session = driver.session();

exports.getSession = () => {
    return driver.session();
}

exports.getDriver = () => {
    return driver;
}