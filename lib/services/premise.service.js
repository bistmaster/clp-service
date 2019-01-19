
'use strict';

var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "PREMISE";
var LABEL_FLOOR = "FLOOR";

/**
 *  Premise module.
 *  @module services/premise
 */
module.exports = {

  /**
   * @function get Get all the premises
   * @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create an premise
   * @param {object} data contains the data of the premise name 
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    return session.run('CREATE (n: ' + LABEL + ' {name: {nameValue}}) RETURN n', { nameValue: data.name }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function belongsTo Assign premise to a floor
   * @param {string} floorName floor name
   * @param {string} premiseName premise name
   * @return {CLPProperty} return of object of Promise 
   */
  belongsTo: function belongsTo(floorName, premiseName) {
    return session.run('MATCH (a: ' + LABEL + ' {name:{premiseNameVal}}), (b: ' + LABEL_FLOOR + ' {name:{floorNameVal}}) MERGE (a)-[r:belong_to]->(b)', { premiseNameVal: premiseName, floorNameVal: floorName }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }
};