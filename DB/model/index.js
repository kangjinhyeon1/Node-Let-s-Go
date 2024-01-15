const Sequelize = require('sequelize');
const config = require('../config/config');

const db = {};

const sequelize = new Sequelize({ ...config, async: false });
db.sequelize = sequelize;

db.write = require('./write')(sequelize, Sequelize);

module.exports = db;