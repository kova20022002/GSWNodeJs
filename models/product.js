/*--------------------------SEQUELIZE----------------------------------------*/
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  itemName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  edition: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  productType: {
    type: Sequelize.ENUM('Jerseys', 'T-Shirts', 'Sweatshirts'),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }

  });

module.exports = Product;






/* 
-----------------------------MODEL MANUALY WITHOUT SEQUELIZE----------------------------
const db = require('../util/database')

module.exports = class Product{
    constructor(id, itemName, edition, description, price, image){
        this.id = id;
        this.itemName = itemName;
        this.edition = edition;
        this.description = description;
        this.price = price;
        this.image = image;
    };


save() {

};

static fetchTshirts() {
    return db.execute('SELECT * FROM t_shirts');
  };

static fetchJerseys() {
    return db.execute('SELECT * FROM jerseys');
  };

static fetchSweatshirts(){
    return db.execute('SELECT * FROM sweatshirts');
};

}; */



