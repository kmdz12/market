const pool = require('../../database/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyJWT } = require('../../middleware/verifyJWT.js');

const saltRounds = 10;

const authController = {

    register: async (req, res) => {

        try {

            const { email, password } = req.body;

            if (email === process.env.OWNER_EMAIL || email == process.env.SUBOWNER_EMAIL || email == process.env.ENTERPRISE_EMAIL) {

                bcrypt.hash(password, saltRounds, async (err, hash) => {

                    const query = await pool.query("INSERT INTO users (email, password, role) VALUES ($1, $2, $3)", [email, hash, 1]);
                })

            } else {

                bcrypt.hash(password, saltRounds, async (err, hash) => {

                    const query = await pool.query("INSERT INTO users (email, password, role) VALUES ($1, $2, $3)", [email, hash, 2]);
                })
            }

            res.status(200).json({ message: 'Values inserted successfully!' })

        } catch (e) {
            console.log(e)
        }

    },

    login: async (req, res) => {

        try {
            const { email, password } = req.body;

            const query = await pool.query('SELECT * FROM users where email = $1', [email]);

            if (query.rowCount > 0) {

                bcrypt.compare(password, query.rows[0]['password'], (err, result) => {

                    if (result) {

                        const id = query.rows[0]['id'];
                        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                            expiresIn: 300
                        });

                        req.session.user = query.rows[0]['email'];

                        res.status(200).json({ auth: true, token: token, result: query.rows[0] });

                    } else {

                        res.status(404).json({ auth: false, message: 'Wrong username/password' });
                    }
                })

            } else {

                res.status(404).json({ auth: false, message: 'User does not exists!' });
            }

        } catch (e) {
            res.status(404).json({ auth: false, message: 'An error has occured, please try again in a few seconds!' });
        }

    },

    checkLoggedUser: async (req, res) => {

        try {

            if (req.session.user) {
                res.status(200).json({ loggedIn: true, user: req.session.user });

            } else {

                res.status(404).json({ loggedIn: false });
            }

        } catch (e) {

            res.status(404).json({ message: 'An error has ocurred, please try again later!' });
        }

    },

    isUserAuth: async (req, res) => {

        verifyJWT(req, res);
        res.send('User Authenticated!');

    }

}

module.exports = { authController }