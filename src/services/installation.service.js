
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "INSTALLATION";
const LABEL_PREMISE = "PREMISE";

/**
 *  Installation module.
 *  @module services/installation
 */
module.exports = {

  /**
   * @function get Get all the installation
   * @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function create Create a installation  
   * @param {object} data Contain the name of the installation details
   * @return {CLPProperty} return of object of Promise
   */  
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n`, {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },

  /**
   * @function belongsTo Assign installation to a premise
   * @param {string} premiseName premise name
   * @param {string} installationName installation name
   * @return {CLPProperty} return of object of Promise 
   */  
  belongsTo: (premiseName, installationName) => {
    return session.run(`MATCH (a: ${LABEL} {name:{installationNameVal}}), (b: ${LABEL_PREMISE} {name:{premiseNameVal}}) MERGE (a)-[r:belong_to]->(b)`, {installationNameVal: installationName, premiseNameVal:premiseName})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  }  
}