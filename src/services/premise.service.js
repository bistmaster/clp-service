
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "PREMISE";
const LABEL_FLOOR = "FLOOR";

/**
 *  Premise module.
 *  @module services/premise
 */
module.exports = {
  
  /**
   * @function get Get all the premises
   * @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function create Create an premise
   * @param {object} data contains the data of the premise name 
   * @return {CLPProperty} return of object of Promise
   */  
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n`, {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },

  /**
   * @function belongsTo Assign premise to a floor
   * @param {string} floorName floor name
   * @param {string} premiseName premise name
   * @return {CLPProperty} return of object of Promise 
   */  
  belongsTo: (floorName, premiseName) => {
    return session.run(`MATCH (a: ${LABEL} {name:{premiseNameVal}}), (b: ${LABEL_FLOOR} {name:{floorNameVal}}) MERGE (a)-[r:belong_to]->(b)`, {premiseNameVal: premiseName, floorNameVal:floorName})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  }
} 
