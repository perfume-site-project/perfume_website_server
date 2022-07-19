const { Product } = require('./models/product');
const url = require('url');

const host = "http://localhost:8000/images/";

const productHandling = {
    upload: async (req, res) => {
        const duplicateProductNameCheck = await Product.findOne({'name': req.body.name});
        if (duplicateProductNameCheck) return res.json({ success: false, error: "상품 이름 중복" });

        const product = new Product(req.body);
        product.userName = req.user.name;
        
        const { intro_image, main_image, sub_images } = req.files;

        product.image_link.intro_image = host + intro_image[0].filename;
        product.image_link.main_image = host + main_image[0].filename;

        for (let i = 0; i < sub_images.length; i++) 
            product.image_link.sub_images.push(host + sub_images[i].filename);

        product.save((err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    },

    find: (req, res) => {
        const requestURL = req.url;
        const queryData = url.parse(requestURL, true).query;
        if (queryData.id) {
            Product.findOne({_id: queryData.id}, (err, product) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json(product);
            });
        } else if (queryData.name) {
            Product.findOne({name: queryData.name}, (err, product) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json(product);
            });
        } else {
            return res.status(400).json({ "success": false });
        }
    },

    findAll: (req, res) => {
        Product.find({}, (err, product) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json(product);
        });
    },

    delete: (req, res) => {
        if (req.body._id) {
            const idForDelete = req.body._id;
            Product.deleteOne({_id: idForDelete}, (err, product) => {
                if (err) console.log(err);
                else return res.status(200).json({ success: true });
            });
        } else if (req.body.name) {
            const nameForDelete = req.body.name;
            Product.deleteOne({name: nameForDelete}, (err, product) => {
                if (err) console.log(err);
                else return res.status(200).json({ success: true });
            });
        }
    },

    update: async (req, res) => {
        let currentProduct;
        const productId = req.body._id;

        currentProduct = await Product.findOne({_id: productId});
        if (!currentProduct) return res.json({ success: false });

        let product = {
            intro_image: currentProduct.image_link.intro_image,
            main_image: currentProduct.image_link.main_image,
            sub_images: currentProduct.image_link.sub_images,
        };
        const { intro_image, main_image, sub_images } = req.files;

        if (intro_image) product.intro_image = host + intro_image[0].filename;
        if (main_image) product.main_image = host + main_image[0].filename;

        if (sub_images) {
            product.sub_images = [];
            for (let i = 0; i < sub_images.length; i++) 
                product.sub_images.push(host + sub_images[i].filename);
        }

        Product.updateOne({ _id: productId }, {
            $set: {
                "name": req.body.name ? req.body.name : currentProduct.name,
                "price": req.body.price ? req.body.price : currentProduct.price,
                "description": req.body.description ? req.body.description : currentProduct.description,
                "ingredient_description": req.body.ingredient_description ? 
                                    req.body.ingredient_description : currentProduct.ingredient_description,
                "tasting_note": req.body.tasting_note ? req.body.tasting_note : currentProduct.tasting_note,
                "image_link": {
                    "intro_image": product.intro_image,
                    "main_image": product.main_image,
                    "sub_images": product.sub_images,
                },
            },
        }, (err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    },

    review: (req, res) => {
        const productId = req.body._id;
        const review = {
            id: req.user.name,
            date: new Date(),
            title: req.body.title,
            content: req.body.content,
            score: Number(req.body.score),
        };

        if (review.score > 5) return res.status(400).json({
            success: false, err: "score is higher than 5",
        });

        Product.updateOne({ _id: productId }, {
            $push: {
                "review": review,
            },
        }, (err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    }
};

module.exports = { productHandling };
