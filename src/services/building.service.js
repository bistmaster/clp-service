
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler'); 
const LABEL = "BUILDING";
const LABEL_PHASE = "PHASE";
const LABEL_ADDRESS = "ADDRESS ";
const LABEL_GEO = "GEO ";

/**
 *  Building module.
 *  @module services/building
 */
module.exports = {

  /**
   * @function get Get all the buidlings
   * @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function create Create a building
   * @param {object} data contains the name of the building
   * @return {CLPProperty} return of object of Promise
   */
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n`, {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },

  /**
   * @function belongsTo Assign building to a phase
   * @param {string} phaseName phase name
   * @param {string} bldgName building name
   * @return {CLPProperty} return of object of Promise 
   */  
  belongsTo: (phaseName, bldgName) => {
    return session.run(`MATCH (a: ${LABEL} {name:{bldgNameVal}}), (b: ${LABEL_PHASE} {name:{phaseNameVal}}) MERGE (a)-[r:belong_to]->(b)`, {bldgNameVal: bldgName, phaseNameVal:phaseName})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  },

  /**
   * @function locatedAt assign the building to a location
   * @param {string} address address name
   * @param {string} bldgName building name
   * @return {CLPProperty} return of object of Promise 
   */  
  locatedAt: (address, bldgName) => {
    return session.run(`MATCH (a: ${LABEL} {name:{bldgNameVal}}), (b: ${LABEL_ADDRESS} {name:{addressVal}}) MERGE (a)-[r:located_at]->(b)`, {bldgNameVal: bldgName, addressVal: address})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  },   
  
  /**
   * @function locatedAt assign the building to a geolocation
   * @param {string} geoName address name
   * @param {string} bldgName building name
   * @return {CLPProperty} return of object of Promise 
   */  
  locatedAtGeo: (geoName, bldgName) => {
    return session.run(`MATCH (a: ${LABEL} {name:{bldgNameVal}}), (b: ${LABEL_GEO} {name:{geoNameVal}}) MERGE (a)-[r:located_at]->(b)`, {bldgNameVal: bldgName, geoNameVal: geoName})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))     
  }   
  
}
