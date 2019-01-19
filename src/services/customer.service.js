
'use strict';
const uuidv4 = require('uuid/v4');
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "CUSTOMER";
const LABEL_PV_SYSTEM = "PV_SYSTEM";

/**
 *  Customer module.
 *  @module services/customer
 */
module.exports = {
  
  /**
   * @function get Get all the customers
   * @return {CLPProperty} return of object of Promise
   */  
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function create Create a customer details
   * @param {object} data contains the name of the customer
   * @return {CLPProperty} return of object of Promise
   */  
  create: (data) => {
    data.userId =  uuidv4();
    return session.run(`CREATE (n: ${LABEL} {first_name: {firstName}, last_name:{lastName}, user_id: {userId}}) RETURN n`, {firstName: data.firstName, lastName: data.lastName, userId: data.userId})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },
  
  /**
   * @function ownPvSystem owned a pv-system
   * @param {string} userId user_id of the customer
   * @param {string} pvSystemName name of the pv-system
   * @return {CLPProperty} return of object of Promise
   */   
  ownPvSystem: (userId, pvSystemName) => {
    return session.run(`MATCH (a: ${LABEL} {user_id: {userId}}), (b: ${LABEL_PV_SYSTEM} {name:{pvSystemName}}) MERGE (a)-[r:owned_by]->(b)`, {userId, pvSystemName})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  }

}
