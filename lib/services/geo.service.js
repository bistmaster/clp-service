
'use strict';

var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "GEO";

/**
 *  Geo module.
 *  @module services/geo
 */
module.exports = {

  /**
   * Get all the geolocation
   *  @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  create: function create(data) {
    return session.run('CREATE (n: ' + LABEL + ' {lat: {latVal}, long: {longVal}}) RETURN n', { latVal: data.lat, longVal: data.long }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }
};