/* --------------------sequelize--------------------------------- */
const Sequelize = require('sequelize');
const sequelize = new Sequelize('shop', 'root', 'metal', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false
});



module.exports = sequelize;


/* 
-----------------------SQL MANUALY-------------------------------
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: 'metal'
});

module.exports = pool.promise(); */