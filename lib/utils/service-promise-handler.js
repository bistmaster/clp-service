'use strict';

var _bluebird = require('bluebird');

exports.resolve = function () {
  return function (data) {
    return (0, _bluebird.resolve)(data);
  };
};

exports.reject = function () {
  return function (err) {
    return (0, _bluebird.reject)(err);
  };
};

exports.finally = function (session, driver) {
  return function () {
    session.close();
    driver.close();
  };
};