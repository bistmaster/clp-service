const Customer = require('./services/customer.service');
const Address = require('./services/address.service');
const Building = require('./services/building.service');
const Floor = require('./services/floor.service');
const Geo = require('./services/geo.service');
const Installation = require('./services/installation.service');
const Meter = require('./services/meter.service');
const Phase = require('./services/phase.service');
const Premise = require('./services/premise.service');
const PVInverter = require('./services/pv-inverter.service');
const PVSystem = require('./services/pv-system.service');
const Account = require('./services/account.service');
const KWH = require('./services/kwh.service');

module.exports = {
    Customer,
    Account,
    Address,
    Building,
    Floor,
    Geo,
    Installation,
    Meter,
    Phase,
    Premise,
    PVInverter,
    PVSystem,
    KWH
}