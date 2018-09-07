
'use strict';
const session = require('../db/connect').getSession();
const driver = require('../db/connect').getDriver();
const service = require('../utils/service-promise-handler');
const LABEL = "GEO";

module.exports = {

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
