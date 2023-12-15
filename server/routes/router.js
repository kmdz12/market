const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const router = express.Router();
const { authController } = require('../controller/auth/AuthController.js');
const { productController } = require('../controller/product/productController.js');
const { userController } = require('../controller/user/UserController.js');
const { orderController } = require('../controller/order/orderController.js');
const { adminOrderController } = require('../controller/admin/adminOrderController.js');
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

router.route('/account')
    .get(userController.getUser)
    .post(userController.saveUserData)

router.route('/directions')
    .get(userController.getDirectionsSelect)
    .post(userController.saveNewAddress)

router.route('/user-directions')
    .get(userController.getUserAddresses)

router.route('/user-orders')
    .get(userController.getUserOrders)

router.route('/order')
    .post(orderController.createOrder)

router.route('/order-mp')
    .post(orderController.createMPOrder)

router.route('/webhook')
    .post(orderController.recieveWebhook)

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

router.route('/admin/orders')
    .get(adminOrderController.getAllOrders)

router.route('/admin/order/:id')
    .put(adminOrderController.updateOrderStatus)

router.post('/admin/images', upload.single('image'), async (req, res) => {

    try {

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        await cloudinary.uploader.upload(dataURI, { format: 'webp' }).then((result) => res.status(200).json(result));

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