import mongoose from "mongoose";

type User = {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<User>({
    email: String,
    password: String
})

export const User = mongoose.model<User>("User", userSchema)