
'use strict';

var uuidv4 = require('uuid/v4');
var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "TIMESTAMP";
var LABEL_MONTH = "MONTH";

/**
 *  Timestamp module.
 *  @module services/kwh
 */
module.exports = {

  /**
   * @function get Get all the timestamp
   * @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create a timestamp 
   * @param {object} data Contain the name of the floor and location
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    data.timeId = data.timeId || uuidv4();
    return session.run('CREATE (n: ' + LABEL + ' {timestamp:{timestampVal}, name: {nameValue}}) RETURN n', { timestampVal: data.timestamp, nameValue: data.name }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function belongsTo assign timestamp to a month
   * @param {string} month meter name
   * @param {string} timeId kwh name
   * @return {CLPProperty} return of object of Promise 
   */
  belongsTo: function belongsTo(month, timeId) {
    return session.run('MATCH (a: ' + LABEL + ' {timeId:{timeIdVal}}), (b: ' + LABEL_MONTH + ' {month:{monthVal}}) MERGE (a)-[r:belong_to]->(b)', { timeIdVal: timeId, monthVal: month }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }

};