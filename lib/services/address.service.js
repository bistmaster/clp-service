
'use strict';

var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "ADDRESS";

/**
 *  Address module.
 *  @module services/address
 */
module.exports = {

  /**
   * @function get Get all the addresses
   * @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create an address
   * @param {object} data contains the data of the address 
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    var params = {
      name: data.name,
      floorVal: data.floor,
      buildingVal: data.building,
      street1Val: data.street1,
      street2Val: data.street2,
      cityVal: data.city,
      countryVal: data.country
    };

    return session.run('CREATE (n: ' + LABEL + ' {floor: {floorVal}, building: {buildingVal}, street1: {street1Val}, street2: {street2Val}, city: {cityVal}, country: {countryVal}}) RETURN n', params).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }

};