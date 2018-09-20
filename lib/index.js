'use strict';

var Customer = require('./services/customer.service');
var Address = require('./services/address.service');
var Building = require('./services/building.service');
var Floor = require('./services/floor.service');
var Geo = require('./services/geo.service');
var Installation = require('./services/installation.service');
var Meter = require('./services/meter.service');
var Phase = require('./services/phase.service');
var Premise = require('./services/premise.service');
var PVInverter = require('./services/pv-inverter.service');
var PVSystem = require('./services/pv-system.service');
var Account = require('./services/account.service');

module.exports = {
    Customer: Customer,
    Account: Account,
    Address: Address,
    Building: Building,
    Floor: Floor,
    Geo: Geo,
    Installation: Installation,
    Meter: Meter,
    Phase: Phase,
    Premise: Premise,
    PVInverter: PVInverter,
    PVSystem: PVSystem
};