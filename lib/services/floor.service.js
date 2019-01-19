
'use strict';

var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "FLOOR";
var LABEL_BDLG = "BUILDING";

/**
 *  Floor module.
 *  @module services/floor
 */
module.exports = {

  /**
   * @function get Get all the floors
   * @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create a floor 
   * @param {object} data Contain the name of the floor and location
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    return session.run('CREATE (n: ' + LABEL + ' {name: {nameValue}}) RETURN n', { nameValue: data.name }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function belongsTo Assign floor to a building
   * @param {string} bldgName building name
   * @param {string} floorName floor name
   * @return {CLPProperty} return of object of Promise 
   */
  belongsTo: function belongsTo(bldgName, floorName) {
    return session.run('MATCH (a: ' + LABEL + ' {name:{floorNameVal}}), (b: ' + LABEL_BDLG + ' {name:{bldgNameVal}}) MERGE (a)-[r:belong_to]->(b)', { floorNameVal: floorName, bldgNameVal: bldgName }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  }
};