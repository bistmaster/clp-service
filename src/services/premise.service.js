
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "PREMISE";

/**
 *  Premise module.
 *  @module services/premise
 */
module.exports = {
  
  /**
   * Get all the premises
   * @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n`, {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  }
}
