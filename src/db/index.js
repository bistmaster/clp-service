const neo4j = require('neo4j-driver').v1;
const config = require(`../config/${process.env.NODE_ENV || 'development'}.env`);

module.exports = {
    connect: () => {
        return neo4j.driver(config.url, neo4j.auth.basic(config.username, config.password));
    }  
}