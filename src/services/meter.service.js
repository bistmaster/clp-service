
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "METER";
const LABEL_ACCOUNT = "BILLING_ACCOUNT";

/**
 *  Meter module.
 *  @module services/meter
 */
module.exports = {

  /**
   * @function get Get all the meter
   * @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function create Create a meter  
   * @param {object} data Contain the name of the meter details
   * @return {CLPProperty} return of object of Promise
   */   
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n`, {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },

  /**
   * @function belongsTo Assign meter to an account
   * @param {string} accountNo account billing information
   * @param {string} meterName meter name
   * @return {CLPProperty} return of object of Promise 
   */  
  belongsTo: (accountNo, meterName) => {
    return session.run(`MATCH (a: ${LABEL} {name:{meterNameVal}}), (b: ${LABEL_ACCOUNT} {accountNo:{accountNoVal}}) MERGE (a)-[r:belong_to]->(b)`, {meterNameVal: meterName, accountNoVal:accountNo})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  }   

}
