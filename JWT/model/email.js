const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(("Email"), {
        emailId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            onDelete: 'CASCADE'
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
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}