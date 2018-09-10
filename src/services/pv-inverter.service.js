
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');

const LABEL = "PV_INVERTER";
const LABEL_PV_SYSTEM = "PV_SYSTEM";

/**
 *  PV System module.
 *  @module services/pv-inverter
 */
module.exports = {

  /**
   * Get all the pv-inverter
   * @return {object} Promise
   */  
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  /**
   * @function create Create pv-inverter
   * @param {object} data name of the pv-inverter
   *  @return {CLPProperty} return of object of Promise
   */  
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {serial: {serialValue}, model:{modelValue}, capacity:{capacityValue}}) RETURN n`, {serialValue: data.serial, modelValue: data.model, capacityValue: data.capacity})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },
  
  /**
   * @function belongsTo Assign pv-inverter to a pv-system
   * @param {string} pvSerial pv serial code
   * @param {string} pvSystemName pv system name
   *  @return {CLPProperty} return of object of Promise 
   */  
  belongsTo: (pvSerial, pvSystemName) => {
    return session.run(`MATCH (a: ${LABEL} {serial: {serialValue}}), (b: ${LABEL_PV_SYSTEM} {name:{nameValue}}) MERGE (a)-[r:belong_to]->(b)`, {serialValue: pvSerial, nameValue: pvSystemName})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))  
  }  

}

