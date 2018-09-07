
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "ADDRESS";

/**
 *  Address module.
 *  @module services/address
 */
module.exports = {

  /**
   * Get all the addresses
   * @return {object} Promise
   */  
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },

  /**
   * Create an address
   * @param {object} data contains the data of the address 
   * @return {object} Promise
   */
  create: (data) => {
    const params = {
      floorVal: data.floor,
      buildingVal: data.building,
      street1Val: data.street1,
      street2Val: data.street2, 
      cityVal: data.city, 
      countryVal: data.country
    }

    return session.run(`CREATE (n: ${LABEL} {floor: {floorVal}, building: {buildingVal}, street1: {street1Val}, street2: {street2Val}, city: {cityVal}, country: {countryVal}}) RETURN n`, params)   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  }

}