"use server";

import dbConnect from "@/lib/db";
import URL from "@/models/URLs";

export async function createUrl(originalURL, redirectURL, redirectType) {
    try {
        await dbConnect();
        const newUrl = new URL({ originalURL, redirectURL, redirectType });
        const savedUrl = await newUrl.save();
        return JSON.parse(JSON.stringify(savedUrl));
    } catch (error) {
        console.error("Error creating URL:", error);
        throw error;
    }
}

export async function getAllUrls() {
    try {
        await dbConnect();
        const urls = await URL.find();

        return JSON.parse(JSON.stringify(urls)); // Convert Mongoose documents to plain JavaScript objects and return the urls;
    } catch (error) {
        console.error("Error fetching URLs:", error);
        throw error;
    }
}