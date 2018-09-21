
'use strict';
const uuidv4 = require('uuid/v4');
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "MONTH";
const LABEL_YEAR = "YEAR";

/**
 *  Month module.
 *  @module services/kwh
 */
module.exports = {


  /**
   * @function get Get all the months
   * @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function create Create a month
   * @param {object} data Contain the name of the floor and location
   * @return {CLPProperty} return of object of Promise
   */
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {timestamp:{timestampVal}, name: {nameValue}}) RETURN n`, {timestampVal: data.timestamp, nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },

  /**
   * @function readFromMeter read from the meter
   * @param {number} year year 
   * @param {number} month kwh name
   * @return {CLPProperty} return of object of Promise 
   */  
  belongsTo: (year, month) => {
    return session.run(`MATCH (a: ${LABEL} {month:{monthval}}), (b: ${LABEL_YEAR} {year:{yearVal}}) MERGE (a)-[r:belong_to]->(b)`, {yearVal: year, monthVal:month})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  }
  
}
