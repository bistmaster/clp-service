
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "FLOOR";

/**
 *  Floor module.
 *  @module services/floor
 */
module.exports = {


  /**
   * Get all the floors
   * 
   *  @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * Create a floor 
   * @param {object} data Contain the name of the floor and location
   *  @return {CLPProperty} return of object of Promise
   */
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n`, {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  }
}
