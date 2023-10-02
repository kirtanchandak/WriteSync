import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const secretKey = process.env.secretKey || "";
console.log(secretKey);

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(403).send({ error: "Token is Invalid!" });
            } else {
                if (!user) {
                    res.sendStatus(403);
                }
                if (typeof user === "string" || !user) {
                    return res.sendStatus(403);
                }
                req.headers["email"] = user.email;
                next();
            }   
        })
    }
    else {
        res.sendStatus(401).send({ error: "You are not authorized!" });
    }
}
