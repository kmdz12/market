const express = require('express');
const router = express.Router();
const { authController } = require('../controller/auth/AuthController.js');
const { productController } = require('../controller/product/productController.js');
// const { imgController } = require('../controller/images/ImgController.js');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.route('/register')
    .post(authController.register)

router.route('/login')
    .post(authController.login)

router.route('/adminLogin')
    .post(authController.adminLogin)

router.route('/currentUser')
    .get(authController.checkLoggedUser)

router.route('/userStatus')
    .get(authController.isUserAuth)

router.route('/categories')
    .get(productController.getAllCategories)

router.route('/client/products')
    .get(productController.getAllClientProducts)

router.route('/client/products/:id')
    .get(productController.getClientProductDetails)

router.route('/admin/products')
    .get(productController.getAllProducts)
    .post(productController.createProduct)
    .put(productController.updateProduct)

router.route('/admin/products/:id')
    .delete(productController.deleteProduct)

router.post('/admin/images', upload.single('image'), async (req, res) => {

    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        await cloudinary.uploader.upload(dataURI).then((result) => res.status(200).json(result));
    } catch (e) {
        console.log(e)
    }

})

router.delete('/admin/images/:public_id', async (req, res) => {

    try {
        const { public_id } = req.params;
        await cloudinary.uploader.destroy(public_id).then((result) => res.status(200).json(result));
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;