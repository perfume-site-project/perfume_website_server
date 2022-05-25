const { productHandling } = require('../database/product_hadling')
const { auth } = require("./middleware/auth");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/images')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})

const upload = multer({
    storage: storage,
});

const fileFields = upload.fields([
    {name: 'main_image', maxCount: 1},
    {name: 'sub_images', maxCount: 8},
]);


const productRouteConfig = (app) => {
    app.post("/product/upload", fileFields, auth, (req, res) => {
        productHandling.upload(req, res);
    });
}

module.exports = { productRouteConfig };
