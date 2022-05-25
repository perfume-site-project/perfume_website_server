const { Product } = require('./models/product');

const host = "http://localhost:8000/images/";

const productHandling = {
    upload: (req, res) => {
        const product = new Product(req.body);
        product.userName = req.user.name;
        
        const { main_image, sub_images } = req.files;

        product.image_link.main_image = host + main_image[0].filename;

        for (let i = 0; i < sub_images.length; i++) 
            product.image_link.sub_images.push(host + sub_images[i].filename);

        console.log(product);

        product.save((err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    }
};

module.exports = { productHandling };
