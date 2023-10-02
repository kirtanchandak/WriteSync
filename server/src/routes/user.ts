import express, {Request, Response, NextFunction } from "express"
import { User } from "../models/user"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Document } from "../models/document"
import { authenticateJWT } from "../middleware/auth"

const router = express.Router()

dotenv.config({ path: "./.env" })

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
    } else {
        const user = new User({ email, password });
        await user.save(); // Await the user.save() operation
        const token = jwt.sign({ email }, process.env.secretKey || "", { expiresIn: "1h" });
        return res.status(200).json({ message: "User created successfully", token, email });
    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const token = jwt.sign({ email, password }, process.env.secretKey || "", { expiresIn: "1h" })
        res.json({ message: "User logged in successfully", token, email });
    } else {
        res.status(403).json({ message: "Invalid email or password" });
    }
    
})

router.post("/document", authenticateJWT, async (req, res) => {
    const {title, content} = req.body;
    const email = req.headers["email"];
    
    try {
        const document = new Document({ title, content, createdBy: email });
        await document.save();
        res.status(201).json({ message: 'Document created successfully', document });
      } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})

router.get("/documents", authenticateJWT, async (req, res) => {
    const email = req.headers["email"];
    try {
        const documents = await Document.find({
            createdBy: email
        });
        res.status(200).json({ documents });
    } catch (error) {
        console.log(error);
    }
})

router.get("/me", authenticateJWT, async (req, res) => {
    res.json({
      username: req.headers["email"],
    });
  });

export { router as userRouter };