
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
   * @function get Get all the geolocation
   * @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create a geolocation  
   * @param {object} data Contain the name of the geo details
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    return session.run('CREATE (n: ' + LABEL + ' {lat: {latVal}, long: {longVal}, name:{geoNameVal}}) RETURN n', { latVal: data.lat, longVal: data.long, geoNameVal: data.name }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }
};