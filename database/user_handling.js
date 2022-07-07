const { User } = require("./models/user");
const { Product } = require('./models/product');
const { Basket } = require("./models/basket");

const userHandling = {

    findid : (req, res) => {
        User.findOne({phone_number: req.body.phoneNumber}, (err, user) => {
            if (err || !user) {
                return res.json({
                    message: "회원 정보가 없습니다.",
                });
            }
            return res.json({email: user.email});
        });
    },

    findpw : (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err || !user) {
                return res.json({
                    message: "회원 정보가 없습니다.",
                });
            }
            
            return res.json({password: user.password});
        });
    },
    basket : (req, res) => {
        const { productId } = req.params;
        const { quantity } = req.body;
      
        isBasket = Basket.findOne({ productId });
        console.log(isBasket, quantity);
        if (isBasket.length) {
          Basket.updateOne({ productId }, { $set: { quantity } });
        } else {
          Basket.create({ productId: productId, quantity: quantity });
        }
        res.send({ result: "success" });
    },
    cartview : (req, res) => {
        const basket = Basket.findOne({});
        const productId = basket.map(basket => basket.productId);

        productsInCart = Product.findOne()
            .where("productId")
            .in(productId);


        concatCart = basket.map(c => {
            for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].productId == c.productId) {
                console.log(c.quantity, productsInCart[i]);
                return { quantity: c.quantity, products: productsInCart[i] };
            }
            }
        });

        res.json({
            basket: concatCart
        });
    },
    delete : (req, res) => {
        const { productId } = req.params;

        const isProductsInBasket = Basket.findOne({ productId });
        if (isProductsInBasket.length > 0) {
          Basket.deleteOne({ productId });
        }
      
        res.send({ result: "success" });
      }
};

module.exports = { userHandling };
