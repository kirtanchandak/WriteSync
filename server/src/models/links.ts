import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doc' },
    sharerEmail: { type: String, required: true },
    viewableLink: { type: String, required: true, unique: true },
    editableLink: { type: String, required: true, unique: true },
});
  
export const Link = mongoose.model("Link", linkSchema);