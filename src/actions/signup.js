"use server";

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function signup(name, email, password) {
    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const result = await newUser.save();
        const userData = JSON.parse(JSON.stringify(result));
        delete userData.password;

        return [{ message: "User created successfully" }, userData];
    } catch (error) {
        console.error("Signup Error:", error);
        return { message: "Internal server error" };
    }
}