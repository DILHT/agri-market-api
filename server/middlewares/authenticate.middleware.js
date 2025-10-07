import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import config from '../../config/config.js'

/**
 * Middleware to authenticate a user from a provided token in the Authorization header.
 * If no token is provided, a 401 status code is returned with a message of "No token provided"
 * If the token fails verification, a 401 status code is returned with a message of "token failed verification"
 * If the token is valid but the corresponding user is not found, a 401 status code is returned with a message of "Invalid token"
 * If the token is valid and the user is found, the user is added to the request object and the next middleware is called
 */

export const authenticate = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token type' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token failed verification' });
    }
}
