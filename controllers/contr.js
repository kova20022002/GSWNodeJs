const Product = require('../models/product');
const Tickets = require('../models/tickets');
const Player = require('../models/player');
const User = require('../models/user');






exports.getIndexPage = (req,res,next) => {
    res.render('index', {
        pageTitle: 'Golden State Warriors',
        path: '/',
        isAuthenticated: req.session.isLoggedIn

    });
};

exports.getFreeTickets = (req,res,next) => {
    res.render('free_tickets', {
        pageTitle: 'Get your free tickets',
        path: '/free_tickets',
        isAuthenticated: req.session.isLoggedIn
    })
};

exports.getCart = async (req, res, next) => {
    if (req.session.user) {
        let totalPrice = 0;
        let totalProducts = 0;
        const id = req.session.user.id;
        const user = await User.findByPk(id);

        try {
            let cart = await user.getCart();
            if (!cart) {
                // If cart doesn't exist, create a new one
                cart = await user.createCart();
            }

            const products = await cart.getProducts();
            for (let product of products) {
                totalPrice += product.price * product.cartItem.quantity;
                totalProducts += 1;
            }

            res.render('cart', {
                pageTitle: 'Cart',
                path: '/cart',
                totalProducts: totalProducts,
                totalPrice: totalPrice,
                products: products,
                isAuthenticated: req.session.isLoggedIn
            });
        } catch (err) {
            console.log(err);
            // Handle error
            res.status(500).send('Internal Server Error');
        }
    } else {
        // Handle scenario when user is not logged in
        res.redirect('/login');
    }
};


/* exports.getCart = async (req,res,next) => {
    if(req.session.user){
    let totalPrice = 0;
    let totalProducts =0;
    const id = req.session.user.id;
    const user = await User.findByPk(id);
    
    user.getCart().then(cart => {
        return cart.getProducts()
        .then(products => {

            for(let product of products){
                totalPrice += ((product.price)*product.cartItem.quantity);
                totalProducts += 1;
            }

            res.render('cart', {
                pageTitle: 'Cart',
                path: '/cart',
                totalProducts: totalProducts,
                totalPrice: totalPrice,
                products: products,       
                isAuthenticated: req.session.isLoggedIn

            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
}; */

exports.getTotalProducts = async (req,res,next) => {
    if(req.session.user){
    const id = req.session.user.id;
    const user= await User.findByPk(id);
    user.getCart()
        .then(cart => {
            if(cart.countProducts() == null){
                
            }else{
                return cart.countProducts()
                .then(totalProducts => {
                    res.json({ totalProducts: totalProducts });
                })
                .catch(error => {
                    console.error('Error counting products in the cart:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
            }
            
        })
        .catch(error => {
            console.error('Error fetching user cart:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
    }
}

exports.postCart = async (req, res, next) => {
    if(req.session.user){
    const prodId = req.body.productId;
    const quantity = req.body.quantity;
    const size = req.body.size;
    let fetchedCart;
    let newQuantity = 1;
    const id = req.session.user.id;
    const user= await User.findByPk(id);
    user.getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
      })
      .then(products => {

        return Product.findByPk(prodId);
      })
      .then(product => {
        return fetchedCart.addProduct(product, {
          through: { quantity: quantity, size: size}
        });
      })
      .then(() => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
    }else{
        res.redirect('/login');
    }
};

exports.postOrder = async (req,res,next) => {
    let fetchedCart;
    const id = req.session.user.id;
    const user= await User.findByPk(id);
    user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
        .then(products => {
            return user.createOrder()
            .then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = {quantity: product.cartItem.quantity, size: product.cartItem.size};
                    return product;
                }));
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    }).then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/order');
    })
    .catch(err => console.log(err));
};

exports.getLogin = (req,res,next) => {
   /* const isLoggedIn = req.get('Cookie').trim().split('=')[1]; */
       res.render('auth/login', {
        path: '/auth/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
        const user = await User.findOne({where: {email: email}})
        .then(foundedUser => {
            if(foundedUser){
                req.session.user = foundedUser;
            req.session.isLoggedIn = true;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            })}
            else{
            res.redirect('/login');
            }
        
            
        
        })
};

exports.postLogout = (req,res,next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }else{
        res.redirect('/');
        }
    });
};

exports.getSignup = (req,res,next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    })
}

exports.postSignup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({where: {email: email}})
    .then(existingUser => {
        if(existingUser){
            return res.redirect('/signup');
        }
        const user = new User({
            email: email,
            password: password
        });
        return user.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = async (req,res,next) =>{
    const prodId = req.body.productId;
    const id = req.session.user.id;
    const user= await User.findByPk(id);
    user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
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
};

exports.getRosterPage = (req,res,next) => {
    Player.findAll().then(player => {
        res.render('roster', {
            player: player,
            pageTitle: 'Roster',
            path: '/roster',
            isAuthenticated: req.session.isLoggedIn

        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getShopPage = (req,res,next) => {
    res.render('shop', {
        pageTitle: 'Shop',
        path: '/shop',
        isAuthenticated: req.session.isLoggedIn

    });
};

exports.getJerseysPage = (req,res,next) => { 
    Product.findAll({where: {productType: 'Jerseys'}}).
    then(products => {
        res.render('shop/jerseys', {
            prods: products,
            pageTitle: products.productType,
            path:'/shop/jerseys',
            isAuthenticated: req.session.isLoggedIn

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
            path:'/shop/t-shirts',
            isAuthenticated: req.session.isLoggedIn

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
            path:'/shop/sweatshirts',
            isAuthenticated: req.session.isLoggedIn
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
            path: '/shop/product-details',
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(err => console.log(err));
};

exports.getOrder = (req,res,next) => {
    res.render('index', {
        pageTitle: 'Golden State Warriors',
        path: '/',
        isAuthenticated: req.session.isLoggedIn

    });
};

