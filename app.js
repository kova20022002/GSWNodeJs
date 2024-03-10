const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const indexRoute = require('./routes/index');
const shopRoute = require('./routes/shop');
/* const jerseysRoute = require('./routes/jerseys'); */
/* const tshirtsRoute = require('./routes/t-shirts');
const sweatshirtsRoute = require('./routes/sweatshirts'); */
const rosterRoute = require('./routes/roster');
const freeTicketsRoute = require('./routes/free_tickets');
const sequelize = require('./util/database');
const Player = require('./models/player');
const Tickets = require('./models/tickets');

app.use(indexRoute);
app.use(shopRoute);
/* app.use('/shop', jerseysRoute); */
/* app.use('/shop', tshirtsRoute);
app.use('/shop', sweatshirtsRoute); */
app.use(rosterRoute);
app.use(freeTicketsRoute);

sequelize.sync().then(() => {
   /*  console.log(result); */
   console.log('ALL GOOD')
   app.listen(3000);
}).catch(err => {
    console.log(err);
})


