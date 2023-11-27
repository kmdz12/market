const pool = require('../../database/db.js');

const productController = {

    createProduct: async (req, res) => {

        const { product } = req.body;

        try {

            const query = await pool.query('INSERT INTO products (sku, name, price, category_id, image_url, public_id, description, offer, offer_duration, offer_price, available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                product.sku, product.name, product.price, parseInt(product.category), product.image_url, product.public_id, product.description, product.offer, product.offer_duration.split('T')[0], product.offer_price, product.available
            ]);
            res.status(200).json({ message: 'Producto guardado exitosamente!' });

        } catch (e) {
            console.log(e)
        }
    },

    getAllProducts: async (req, res) => {

        try {

            const query = await pool.query('SELECT * FROM products');
            res.status(200).json(query.rows);

        } catch (e) {
            console.log(e)
        }
    },

    getAllClientProducts: async (req, res) => {

        try {

            const query = await pool.query('SELECT * FROM "productsView"');
            res.status(200).json(query.rows);

        } catch (e) {
            console.log(e)
        }
    },

    getClientProductDetails: async (req, res) => {

        try {

            const { id } = req.params;
            const query = await pool.query('SELECT * FROM "productsView" WHERE id = $1', [id]);
            res.status(200).json(query.rows[0])

        } catch (e) {
            console.log(e)
        }
    },

    getAllCategories: async (req, res) => {

        try {

            const query = await pool.query('SELECT * FROM categories');
            res.status(200).json(query.rows);

        } catch (e) {
            console.log(e)
        }
    },

    updateProduct: async (req, res) => {

        try {

            const { id, product } = req.body;
            const query = await pool.query('UPDATE products SET sku = $1, name = $2, price = $3, category_id = $4, image_url = $5, public_id = $6, description = $7, offer = $8, offer_duration = $9, offer_price = $10, available = $11 WHERE id = $12', [
                product.sku, product.name, product.price, parseInt(product.category), product.image_url, product.public_id, product.description, product.offer, product.offer_duration.split('T')[0], product.offer_price, product.available, id
            ]);
            res.status(200).json({ message: 'Producto actualizado exitosamente!' });

        } catch (e) {
            console.log(e)
        }
    },

    deleteProduct: async (req, res) => {

        try {
            const { id } = req.params;
            const query = await pool.query('DELETE FROM products WHERE id = $1', [id]);
            res.status(200).json({ message: 'Producto eliminado exitosamente!' })

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = { productController }