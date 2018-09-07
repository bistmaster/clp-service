
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "PV_SYSTEM";
const LABEL_PREMISE = "PREMISE";

/**
 *  PV System module.
 *  @module services/pv-system
 */
module.exports = {

  /**
   * Get all the pv-system
   * @return {object} Promise
   */
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * Create pv-system
   * @param {object} data name of the pv-system
   * @return {object} Promise
   */
  create: (data) => {
    return session.run("CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n", {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },
  
  /**
   * Assign pv-system to a premise
   * @param {string} pvSystemName pv system name
   * @param {string} premiseName premise name
   * @return {object} Promise 
   */
  locatedAt: (pvSystemName, premiseName) => {
    return session.run(`MATCH (a: ${LABEL} {name: {pvNameValue}}), (b: ${LABEL_PREMISE} {name:{pNameValue}}) MERGE (a)-[r:located_at]->(b)`, {pvNameValue: pvSystemName, pNameValue: premiseName})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  }

}
