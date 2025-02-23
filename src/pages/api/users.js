import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
    await connectToDatabase(); // Connect to MongoDB

    if (req.method === "GET") {
        const users = await User.find({});
        return res.status(200).json(users);
    }

    if (req.method === "POST") {
        const { name, email, userType } = req.body;
        const newUser = new User({ name, email, userType });
        await newUser.save();
        return res.status(201).json(newUser);
    }

    res.status(405).json({ message: "Method Not Allowed" });
}
