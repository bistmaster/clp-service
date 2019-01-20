
'use strict';
const uuidv4 = require('uuid/v4');
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "ACCOUNT";
const LABEL_CUSTOMER = "CUSTOMER";

/**
 *  Account module.
 *  @module services/account
 */
module.exports = {


  /**
   * @function get Get all the accounts
   * @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function get Get all the accounts
   * @return {CLPProperty} return of object of Promise
   */    
  getCustomerByAccountNo: (accountNo) => {
    return session.run(`Match (a:${LABEL} {accountNo:{accountNoVal}})-[:belong_to]->(b:${LABEL_CUSTOMER}) RETURN a`, {accountNoVal: accountNo})
    .then(service.resolve())
    .catch(service.reject())
    .finally(service.finally(session, driver))    
  },

  /**
   * @function create Create a Account 
   * @param {object} data Contain the name of the account
   * @return {CLPProperty} return of object of Promise
   */
  create: (data) => {
    data.accountNo = data.accountNo || uiudv4();
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}, accountNo: {accountNoVal}}) RETURN n`, {nameValue: data.name, accountNoVal: data.accountNo})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },

  /**
   * @function belongsTo assign account to customer
   * @param {string} customerId customer account no
   * @param {string} account floor name
   * @return {CLPProperty} return of object of Promise 
   */
  belongsTo: (customerId, accountNo) => {
    return session.run(`MATCH (a: ${LABEL} {accountNo:{accountNoVal}}), (b: ${LABEL_CUSTOMER} {user_id:{customerIdVal}}) MERGE (a)-[r:belong_to]->(b)`, {accountNoVal: accountNo, customerIdVal:customerId})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  } 
  
  
}
