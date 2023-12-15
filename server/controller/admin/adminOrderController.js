const pool = require('../../database/db.js');

const adminOrderController = {

    getAllOrders: async (req, res) => {

        try {

            const query = await pool.query('SELECT * FROM "ordersView"');
            res.status(200).json(query.rows);

        } catch (e) {
            console.log(e);
        }
    },

    updateOrderStatus: async (req, res) => {

        try {
            const { id } = req.params;
            const { statusOption, reasonStatus } = req.body;

            if (statusOption == 3) {

                //Put with reason included, otherwise...
                const query = await pool.query('UPDATE orders SET status_fk = $1, reason = $2 WHERE id = $3', [statusOption, reasonStatus, id]);

            } else {

                const query = await pool.query('UPDATE orders SET status_fk = $1 WHERE id = $2', [statusOption, id]);
            }

            res.status(200).json({ message: 'Orden Actualizada!' });

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { adminOrderController }