const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require('./util/database');

const axios = require('axios');






app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const mysql = require('mysql2/promise');

  
  
  var sessionStore = new SequelizeStore({
    db: sequelize,
  });
  
  app.use(session({secret: 'my secret', 
     resave:false, 
     saveUninitialized: false,
     store: sessionStore,
     proxy: true,
    }));

    sessionStore.sync();

 
/* const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'metal',
  database: 'shop'
});


const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 3600000,
  createDatabaseTable: true
}, pool);

app.use(session({secret: 'my secret', 
   resave:false, 
   saveUninitialized: false, 
   store: sessionStore
  })); */
 




app.set('view engine', 'ejs');
app.set('views', 'views');

const indexRoute = require('./routes/index');
const shopRoute = require('./routes/shop');
const rosterRoute = require('./routes/roster');
const freeTicketsRoute = require('./routes/free_tickets');
const Player = require('./models/player');
const Tickets = require('./models/tickets');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');
const Order = require('./models/order');
const llogin = require('./routes/login')

/* app.use((req,res,next) =>{
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next(); 
    })
    .catch(err => console.log(err))
}) */

app.use(indexRoute);
app.use(shopRoute);
app.use(rosterRoute);
app.use(freeTicketsRoute);
app.use(llogin);


User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem});


sequelize.sync()

.then(result => {

   app.listen(3000);
}).catch(err => {
    console.log(err);
})


/* sequelize.sync()
.then(result => {
    return User.findOne({where: {id: 1}});
})
.then(user => {
    return Cart.findOne({where: {id:1}})
    .then(cart => {
        if(!cart){
        
        }
        return cart;
    })
})
.then(cart => {

   app.listen(3000);
}).catch(err => {
    console.log(err);
}) */




/* app.use((req,res,next) => {
  if(req.session.user){
    return User.findOne({where: {email: req.session.user.email}})
    .then(user => {
      return Cart.findOne({where: {userId:req.session.user.id}})
      .then(cart => {
          if(!cart){
          
          }
          return cart;
      })
  });}
    
})



sequelize.sync()

.then(cart => {

 app.listen(3000);
}).catch(err => {
  console.log(err);
}) */


