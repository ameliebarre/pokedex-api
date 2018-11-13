import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

let config = dotenv.config();

export class AuthMiddleware {

    public checkToken = (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        if (token) {
            jwt.verify(token, config.JWT_SECRET, function(err, decode) {
                if (err) {
                    return res.status(401).json({ error: true, message: 'Unauthorized access' });
                }

                req.decoded = decode;
                next();
            })
        } else {
            return res.status(401).send({
                "error": true,
                "message": 'Unauthorized access'
            });
        }
    }

}