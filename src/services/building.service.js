
'use strict';
const session = require('../db/connect').getSession();
const driver = require('../db/connect').getDriver();
const service = require('../utils/service-promise-handler');
const LABEL = "BUILDING";

module.exports = {
  
  get = () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  create = (data) => {
    return session.run(`CREATE (n: ${LABEL} {name: {nameValue}}) RETURN n`, {nameValue: data.name})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  }
}
