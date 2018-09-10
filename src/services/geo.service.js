
'use strict';
const neo4j = require('../db');
const driver = neo4j.connect();
const session = driver.session();
const service = require('../utils/service-promise-handler');
const LABEL = "GEO";

/**
 *  Geo module.
 *  @module services/geo
 */
module.exports = {

  /**
   * Get all the geolocation
   *  @return {CLPProperty} return of object of Promise
   */    
  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {lat: {latVal}, long: {longVal}}) RETURN n`, {latVal: data.lat, longVal: data.long})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  }
}
