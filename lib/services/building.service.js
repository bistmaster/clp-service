
'use strict';

var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "BUILDING";

/**
 *  Building module.
 *  @module services/building
 */
module.exports = {

  /**
   * Get all the buidlings
   *  @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * Create a building
   * @param {object} data contains the name of the building
   *  @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    return session.run('CREATE (n: ' + LABEL + ' {name: {nameValue}}) RETURN n', { nameValue: data.name }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }
};