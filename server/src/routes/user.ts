import express from "express"
import { User } from "../models/user"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const router = express.Router()

dotenv.config({ path: "./.env" })

const authenticateJWT = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.secretKey || "", (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403).send({error: "Token in Invalid!"});
            } else {
                req.user = user;
                next();
            }   
        })
    }
    else {
        res.sendStatus(401).send({error: "You are not authorized!"});
    }
}

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
    } else {
        const user = new User({ email, password });
        user.save();
        const token = jwt.sign({ email }, process.env.secretKey || "", { expiresIn: "1h" })
        return res.status(200).json({ message: "User created successfully", token });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const token = jwt.sign({ email }, process.env.secretKey || "", { expiresIn: "1h" })
        res.json({ message: "User logged in successfully", token });
    } else {
        res.status(403).json({ message: "Invalid email or password" });
    }
    
})

export { router as userRouter };