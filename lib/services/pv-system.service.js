
'use strict';

var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "PV_SYSTEM";
var LABEL_PREMISE = "PREMISE";

/**
 *  PV System module.
 *  @module services/pv-system
 */
module.exports = {

  /**
   * Get all the pv-system
   * @return {object} Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create pv-system
   * @param {object} data name of the pv-system
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    return session.run('CREATE (n: ' + LABEL + ' {name: {nameValue}}) RETURN n', { nameValue: data.name }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function locatedAt assign pv-system to a premise
   * @param {string} pvSystemName pv system name
   * @param {string} premiseName premise name
   * @return {CLPProperty} return of object of Promise
   */
  locatedAt: function locatedAt(pvSystemName, premiseName) {
    return session.run('MATCH (a: ' + LABEL + ' {name: {pvNameValue}}), (b: ' + LABEL_PREMISE + ' {name:{pNameValue}}) MERGE (a)-[r:located_at]->(b)', { pvNameValue: pvSystemName, pNameValue: premiseName }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }

};