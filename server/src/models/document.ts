import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
export const Document = mongoose.model("Document", docSchema);