
'use strict';
const session = require('../db/connect').getSession();
const driver = require('../db/connect').getDriver();
const service = require('../utils/service-promise-handler');
const LABEL = "PV_SYSTEM";
const LABEL_PREMISE = "PREMISE";

module.exports = {

  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  create: (data) => {
    return session.run("CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n", {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },
  
  locatedAt: (pvSystemName, premiseName) => {
    return session.run(`MATCH (a: ${LABEL} {name: {pvNameValue}}), (b: ${LABEL_PREMISE} {name:{pNameValue}}) MERGE (a)-[r:located_at]->(b)`, {pvNameValue: pvSystemName, pNameValue: premiseName})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  }

}
