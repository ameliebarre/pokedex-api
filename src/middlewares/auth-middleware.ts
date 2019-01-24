import * as jwt from 'jsonwebtoken';

export class AuthMiddleware {

    public checkToken = (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];

        if (token && token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'No token provided'
            });
        }
    };
}