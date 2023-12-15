const pool = require('../../database/db.js');

const userController = {

    // Load user data based on req.session.user, return all even if values are null
    getUser: async (req, res) => {

        try {

            const { user } = req.session;
            const query = await pool.query('SELECT * FROM "userView" WHERE email = $1', [user]);
            res.status(200).json(query.rows[0]);

        } catch (e) {
            console.log(e);
        }
    },

    saveUserData: async (req, res) => {

        // Get the userID from req.session query, then save that id with the user data.
        try {

            const { user } = req.session;
            const { name, surname, phone } = req.body;
            const { id, info_id } = await (await pool.query('SELECT id, info_id FROM "userView" WHERE email = $1', [user])).rows[0];
            const infoCheck = await pool.query('SELECT EXISTS (SELECT 1 FROM "userView" WHERE name IS NULL AND surname IS NULL AND phone IS NULL AND email = $1) AS empty;', [user]);

            if (infoCheck.rows[0].empty) {
                // In case of creating
                const query = await pool.query('INSERT INTO info_users (name, surname, phone, user_fk) VALUES ($1, $2, $3, $4)', [name, surname, phone, id]);

            } else {
                // In case of updating
                const query = await pool.query('UPDATE info_users SET name = $1, surname = $2, phone = $3, user_fk = $4 WHERE id = $5', [name, surname, phone, id, info_id]);
            }

            res.status(200).json({ message: 'Datos actualizados correctamente!', code: 200 });

        } catch (e) {
            console.log(e);
        }
    },

    getDirectionsSelect: async (req, res) => {

        try {

            const query = await pool.query('SELECT * FROM "directionsView"');
            res.status(200).json(query.rows);

        } catch (e) {
            console.log(e);
        }
    },

    getUserAddresses: async (req, res) => {

        try {

            const { user } = req.session;
            const query = await pool.query('SELECT * FROM "userDirectionsView" WHERE email = $1', [user]);
            res.status(200).json(query.rows);

        } catch (e) {
            console.log(e)
        }
    },

    saveNewAddress: async (req, res) => {

        try {

            const { departament, locality, newAddress, info_id } = req.body;
            const query = await pool.query('INSERT INTO directions_users (street, indications, departament_fk, locality_fk, user_info_fk) VALUES ($1, $2, $3, $4, $5) RETURNING ID', [newAddress.street, newAddress.indications, departament, locality, info_id]);
            res.status(200).json({ message: 'Dirección insertada correctamente!', id: query.rows[0].id });

        } catch (e) {
            console.log(e);
        }
    },

    getUserOrders: async (req, res) => {

        try {

            const { user } = req.session;
            const query = await pool.query('SELECT * FROM "userOrdersView" WHERE email = $1 ORDER BY id DESC LIMIT 5', [user]);
            res.status(200).json(query.rows);

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { userController }