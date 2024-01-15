const { configDotenv } = require('dotenv');

configDotenv();

module.exports = {
    "username": process.env.DB_USERNAME,
    "host": process.env.DB_HOST,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_SCHEMA,
    "port": 3306,
    "dialect": "mysql",
}