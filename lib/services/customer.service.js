
'use strict';

var uuidv4 = require('uuid/v4');
var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "CUSTOMER";
var LABEL_PV_SYSTEM = "PV_SYSTEM";

/**
 *  Customer module.
 *  @module services/customer
 */
module.exports = {

  /**
   * Get all the customers
   *  @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  create: function create(data) {
    data.userId = uuidv4();
    return session.run('CREATE (n: ' + LABEL + ' {first_name: {firstName}, last_name:{lastName}, user_id: {userId}}) RETURN n', { firstName: data.firstName, lastName: data.lastName, userId: data.userId }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  ownPvSystem: function ownPvSystem(userId, pvSystemName) {
    return session.run('MATCH (a: ' + LABEL + ' {user_id: {userId}}), (b: ' + LABEL_PV_SYSTEM + ' {name:{pvSystemName}}) MERGE (a)-[r:owned_by]->(b)', { userId: userId, pvSystemName: pvSystemName }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }

};