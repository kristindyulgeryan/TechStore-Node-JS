
import { JWT_SECRET } from '../config.js';
import jsonwebtoken from '../lib/jsonwebtoken.js';

export const generateToken= async (user) =>{
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    const token = await jsonwebtoken.sign(payload, JWT_SECRET, {expiresIn: '2h'});
    return token;
}
