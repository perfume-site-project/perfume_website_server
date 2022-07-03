const { Product } = require('./models/product');
const url = require('url');

const host = "http://localhost:8000/images/";

const productHandling = {
    upload: (req, res) => {
        const product = new Product(req.body);
        product.userName = req.user.name;
        
        const { main_image, sub_images } = req.files;

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
        Product.findOne({name: queryData.name}, (err, product) => {
            return res.status(200).json(product);
        });
    },

    delete: (req, res) => {
        const nameForDelete = req.body.name;
        Product.deleteOne({name: nameForDelete}, (err, product) => {
            if (err) console.log(err);
            else return res.status(200).json({ success: true });
        });
    },

    update: (req, res) => {
        const productId = req.body._id;
        let product = {
            main_image: "",
            sub_images: [],
        };
        const { main_image, sub_images } = req.files;

        product.main_image = host + main_image[0].filename;

        for (let i = 0; i < sub_images.length; i++) 
            product.sub_images.push(host + sub_images[i].filename);

        Product.updateOne({ _id: productId }, {
            $set: {
                "name": req.body.name,
                "price": req.body.price,
                "description": req.body.description,
                "ingredient_description": req.body.ingredient_description,
                "tasting_note": req.body.tasting_note,
                "image_link": {
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
            date: Date.now(),
            title: req.body.title,
            content: req.body.content,
            score: Number(req.body.score),
        };

        if (review.score > 5) return res.status(400).json({
            success: false, err: "score is higher than 5"
        });

        Product.updateOne({ _id: productId }, {
            $push: {
                "review": review,
            }
        }, (err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    }
};

module.exports = { productHandling };
