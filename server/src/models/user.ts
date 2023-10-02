import mongoose from "mongoose";

type User = {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

export const User = mongoose.model<User>("User", userSchema)