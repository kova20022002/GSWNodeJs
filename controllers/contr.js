const Product = require('../models/product');
const Tickets = require('../models/tickets');
const Player = require('../models/player');




exports.getIndexPage = (req,res,next) => {
    res.render('index', {
        pageTitle: 'Golden State Warriors',
        path: '/',
    });
};

exports.getFreeTickets = (req,res,next) => {
    res.render('free_tickets', {
        pageTitle: 'Get your free tickets',
        path: '/free_tickets'
    })
};

exports.postFreeTickets = (req,res,next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const state = req.body.state;

    Tickets.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthday,
        gender: gender,
        state:state
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    
    res.redirect('/');
}

exports.getRosterPage = (req,res,next) => {
    Player.findAll().then(player => {
        res.render('roster', {
            player: player,
            pageTitle: 'Roster',
            path: '/roster',
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getShopPage = (req,res,next) => {
    res.render('shop', {
        pageTitle: 'Shop',
        path: '/shop',
    });
};

exports.getJerseysPage = (req,res,next) => { 
    Product.findAll({where: {productType: 'Jerseys'}}).
    then(products => {
        res.render('shop/jerseys', {
            prods: products,
            pageTitle: products.productType,
            path:'/shop/jerseys'
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getTshirtsPage = (req,res,next) => {
    Product.findAll({where: {productType: 'T-Shirts'}}).
    then(products => {
        res.render('shop/t-shirts', {
            prods: products,
            pageTitle: products.productType,
            path:'/shop/t-shirts'
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getSweatshirtsPage = (req,res,next) => {
    Product.findAll({where: {productType: 'Sweatshirts'}}).
    then(products => {
        res.render('shop/sweatshirts', {
            prods: products,
            pageTitle: products.productType,
            path:'/shop/sweatshirts'
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getProductDetails = (req,res,next) => {
    const prodId = req.params.id;
    Product.findAll({where: {id: prodId}})
    .then(product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.productType,
            path: '/shop/product-details'
        }, console.log(product));
    })
    .catch(err => console.log(err));
}

  /* 
    exports.getJerseysPage = (req,res,next) => { 
    Product.fetchJerseys().
    then(([rows, fieldData]) => {
        res.render('shop/jerseys', {
            prods: rows,
            pageTitle: 'Jerseys',
            path:'/shop/jerseys'
        });
    }).catch(err => {
        console.log(err);
    }) };*/

    /* exports.getTshirtsPage = (req,res,next) => {
        Product.fetchTshirts().
        then(([rows, fieldData]) => {
                res.render('shop/t-shirts', {
                    prods: rows,
                    pageTitle: 'T-Shirts',
                    path: '/shop/t-shirts'
                  }
                  );
            }
        ).catch(err => {
            console.log(err);
        });
    }; */

    /* exports.getSweatshirtsPage = (req,res,next) => {
        Product.fetchSweatshirts().
        then(([rows, fieldData]) => {
            res.render('shop/sweatshirts', {
                prods: rows,
                pageTitle: 'Sweatshirts',
                path: '/shop/sweatshirts'
            });
        }
        ).catch(err => {
            console.log(err);
        });
    }; */
    