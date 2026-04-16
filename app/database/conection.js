const { Sequelize } = require('sequelize');
require('dotenv').config();

// CONFIGURAÇÃO DO SEQUELIZE
const sequelize = new Sequelize(
    process.env.DB_NAME || 'bestfit', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASS || '', 
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql', // O Sequelize precisa saber que é MySQL
        logging: false,   // Para não poluir o terminal com SQL
        define: {
            timestamps: false // Como seu banco não tem createdAt/updatedAt
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;