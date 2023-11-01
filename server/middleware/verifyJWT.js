const jwt = require('jsonwebtoken');

const verifyJWT = (req, res) => {

    const token = req.headers['x-access-token'];

    if (!token) {
        res.send('Token is missing!');

    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                res.json({ auth: false, message: 'Failed to authenticate!' });
            } else {
                req.userId = decoded.id;
            }
        })
    }
}

module.exports = { verifyJWT }