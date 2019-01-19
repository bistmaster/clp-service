'use strict';

var neo4j = require('neo4j-driver').v1;
var config = require('../config/' + (process.env.NODE_ENV || 'dev') + '.env');

module.exports = {
    connect: function connect() {
        return neo4j.driver(config.url, neo4j.auth.basic(config.username, config.password));
    }
};