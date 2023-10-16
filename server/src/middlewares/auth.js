import jwt from 'jsonwebtoken';
import dotenv from "dotenv/config.js"; // importar o dotenv para localizar as variáveis de ambiente

export default (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];
    
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Couldn't get token");
    }
};