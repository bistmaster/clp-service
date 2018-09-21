
'use strict';

var uuidv4 = require('uuid/v4');
var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "METER";
var LABEL_ACCOUNT = "BILLING_ACCOUNT";

/**
 *  Meter module.
 *  @module services/meter
 */
module.exports = {

  /**
   * @function get Get all the meter
   * @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create a meter  
   * @param {object} data Contain the name of the meter details
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {

    var parameters = {
      nameValue: data.name,
      meterIdVal: data.meterId == data.meterId || uuidv4(),
      forecastVal: data.forecast,
      measurementVal: data.measurement,
      timestampVal: timestamp
    };

    return session.run('CREATE (n: ' + LABEL + ' {name: {nameValue}, timestamp:{timestampVal}, meterId:{meterIdVal}, day_ahead_forcast:{forecastVal}, real_time_measurement:{measurementVa}}) RETURN n.meterId', parameters).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function belongsTo Assign meter to an account
   * @param {string} accountNo account billing information
   * @param {string} meterName meter name
   * @return {CLPProperty} return of object of Promise 
   */
  belongsTo: function belongsTo(accountNo, meterName) {
    return session.run('MATCH (a: ' + LABEL + ' {name:{meterNameVal}}), (b: ' + LABEL_ACCOUNT + ' {accountNo:{accountNoVal}}) MERGE (a)-[r:belong_to]->(b)', { meterNameVal: meterName, accountNoVal: accountNo }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }

};