const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            console.error('Error al verificar el token:', err);
            return res.status(403).json({ error: 'Token inválido' });
        }
        
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;