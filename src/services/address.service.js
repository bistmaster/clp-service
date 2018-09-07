
'use strict';
const session = require('../db/connect').getSession();
const driver = require('../db/connect').getDriver();
const service = require('../utils/service-promise-handler');
const LABEL = "ADDRESS";

module.exports = {

  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },

  create: () => {
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