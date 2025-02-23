import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    originalURL: { type: String, required: true },
    redirectURL: { type: String, required: true },
    redirectType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const URL = mongoose.models.URL || mongoose.model("URL", URLSchema);

export default URL;