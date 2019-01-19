
'use strict';

var _bluebird = require('bluebird');

var neo4j = require('../db');
var driver = neo4j.connect();
var session = driver.session();
var service = require('../utils/service-promise-handler');
var LABEL = "KWH";
var LABEL_METER = "METER";
var LABEL_TIMESTAMP = "TIMESTAMP";

/**
 *  KWH module.
 *  @module services/kwh
 */
module.exports = {

  /**
   * @function get Get all the kwh
   * @return {CLPProperty} return of object of Promise
   */
  get: function get() {
    return session.run('MATCH (n: ' + LABEL + ') RETURN n').then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function create Create a kwh  
   * @param {object} data Contain the name of the floor and location
   * @return {CLPProperty} return of object of Promise
   */
  create: function create(data) {
    var parameters = {
      nameValue: data.name,
      forecastVal: data.forecast,
      measurementVal: data.measurement,
      timestampVal: data.timestamp
    };

    return session.run('CREATE (n: ' + LABEL + ' {name: {nameValue}, timestamp:{timestampVal}, day_ahead_forcast:{forecastVal}, real_time_measurement:{measurementVal}}) RETURN n', parameters).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * @function readFromMeter read from the meter
   * @param {string} meterName meter name
   * @param {string} kwhName kwh name
   * @return {CLPProperty} return of object of Promise 
   */
  readFromMeter: function readFromMeter(meterName, kwhName) {
    return session.run('MATCH (a: ' + LABEL + ' {name:{kwhNameVal}}), (b: ' + LABEL_METER + ' {name:{meterNameVal}}) MERGE (a)-[r:read_from]->(b)', { kwhNameVal: kwhName, meterName: meterName }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
  * @function readAtTimestamp read at timestamp
  * @param {string} timeId timestamp name
  * @param {string} kwhName kwh name
  * @return {CLPProperty} return of object of Promise 
  */
  readAtTimestamp: function readAtTimestamp(timeId, kwhName) {
    return session.run('MATCH (a: ' + LABEL + ' {name:{kwhNameVal}}), (b: ' + LABEL_TIMESTAMP + ' {timeId:{timeIdVal}}) MERGE (a)-[r:read_at]->(b)', { kwhNameVal: kwhName, timeIdVal: timeId }).then(service.resolve()).catch(service.reject()).finally(service.finally(session, driver));
  },

  /**
   * TODO:
   * @function calculateCurrentConsumption formula = sum (Starting month(Jan) to year to date)
   * 
   */
  calculateCurrentConsumption: function calculateCurrentConsumption() {
    var data = {};
    return (0, _bluebird.resolve)(data);
  },

  /**
   * TODO:
   * @function calculateTargetConsumption Formula = sum prev year - (targetinput * (sum prev year))
   * 
   */
  calculateTargetConsumption: function calculateTargetConsumption(targetInput) {
    var data = {};
    return (0, _bluebird.resolve)(data);
  },

  /**
   * TODO:
   * @function getLastYearConsumption formula = sum previos year consumption
   * 
   */
  getLastYearConsumption: function getLastYearConsumption() {
    var data = {};
    return (0, _bluebird.resolve)(data);
  },

  /**
   * TODO:
   * @function getYearlyEnergyConsumption
   */
  getYearlyEnergyConsumption: function getYearlyEnergyConsumption() {
    var data = {};
    return (0, _bluebird.resolve)(data);
  },

  /**
   * TODO:
   * @function getConsumptionPercentDiffYear
   */
  getConsumptionPercentDiffYear: function getConsumptionPercentDiffYear() {
    var data = {};
    return (0, _bluebird.resolve)(data);
  },

  /**
   * TODO:
   * @function getConsumptionPercentDiffYearInDay
   */
  getConsumptionPercentDiffYearInDay: function getConsumptionPercentDiffYearInDay() {
    var data = {};
    return (0, _bluebird.resolve)(data);
  }

};