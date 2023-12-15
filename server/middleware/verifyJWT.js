const jwt = require('jsonwebtoken');

const verifyJWT = (req, res) => {

    const token = req.headers['x-access-token'];

    if (!token) {
        res.json({ auth: false, message: 'Token is missing!' });

    } else {

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                res.json({ auth: false, message: err.message });

            } else {
                res.json({ auth: true, message: 'User Authenticated!' });
                req.userId = decoded.id;
            }
        })
    }
}

module.exports = { verifyJWT }