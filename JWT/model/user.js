const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(("User"), {
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "NAME",
        },
        birth: {
            type: DataTypes.DATE,
            allowNull: false,
            default: new Date(Date.now()).toISOString(),
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
}