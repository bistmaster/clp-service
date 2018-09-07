
'use strict';
const session = require('../db/connect').getSession();
const driver = require('../db/connect').getDriver();
const service = require('../utils/service-promise-handler');

const LABEL = "PV_INVERTER";
const LABEL_PV_SYSTEM = "PV_SYSTEM";

module.exports = {

  get: () => {
    return session.run(`MATCH (n: ${LABEL}) RETURN n`)
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))
  },
  
  create: (data) => {
    return session.run(`CREATE (n: ${LABEL} {serial: {serialValue}, model:{modelValue}, capacity:{capacityValue}}) RETURN n`, {serialValue: data.serial, modelValue: data.model, capacityValue: data.capacity})   
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))       
  },
  
  belongsTo: (pvSerial, pvSystemName) => {
    return session.run(`MATCH (a: ${LABEL} {serial: {serialValue}}), (b: ${LABEL_PV_SYSTEM} {name:{nameValue}}) MERGE (a)-[r:belong_to]->(b)`, {serialValue: pvSerial, nameValue: pvSystemName})
      .then(service.resolve())
      .catch(service.reject())
      .finally(service.finally(session, driver))  
  }  

}

