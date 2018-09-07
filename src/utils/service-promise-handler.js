'use strict';

exports.resolve = () => {
  return (data) => {
    return Promise.resolve(data.records);
  }
}

exports.reject = () => {
  return (err) => {
    return Promise.reject(err);
  }
}

exports.finally = (session, driver) => {
  return () => {
    session.close();
    driver.close();
  }
}