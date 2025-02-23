import mongoose from "mongoose";

const PagesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Page || mongoose.model("Page", PagesSchema);