const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(("Email"), {
        emailId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}