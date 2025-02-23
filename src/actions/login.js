"use server";

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
// import { signIn } from "@/auth"; // Optional: For NextAuth.js or custom auth

// export async function login(email, password) {
//     try {
//         await dbConnect();
//         console.log('DB connected');
//         // Find the user by email
//         const user = await User.findOne({ email }).lean();
//         console.log("🚀 ~ login ~ user:", user)
//         if (!user) {
//             return { message: "Invalid Username or Password", error: "Authentication Failed", success: false };
//         }

//         // Compare the provided password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         console.log("🚀 ~ login ~ isPasswordValid:", isPasswordValid)
//         if (!isPasswordValid) {
//             return { message: "Invalid Username or Password", error: "Authentication Failed", success: false };
//         }

//         // Optional: If using NextAuth.js or custom auth, sign in the user
//         // await signIn("credentials", { email, password });


//         return JSON.parse(JSON.stringify({ success: "Login successful", user: { id: user._id, name: user.name, email: user.email, userType: user.userType } }));
//     } catch (error) {
//         console.error("Login Error:", error);
//         return { error: "Internal server error" };
//     }
// }

export async function login(email, password) {
    try {
        await dbConnect();
        console.log('DB connected');

        // Find the user by email
        const user = await User.findOne({ email }).lean();
        console.log("🚀 ~ login ~ user:", user);

        if (!user) {
            return {
                message: "Invalid Username or Password",
                error: "Authentication Failed",
                success: false
            };
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("🚀 ~ login ~ isPasswordValid:", isPasswordValid);

        if (!isPasswordValid) {
            return {
                message: "Invalid Username or Password",
                error: "Authentication Failed",
                success: false
            };
        }

        // Return success with user data (excluding password)
        return {
            success: true,
            message: "Login successful",
            userType: user.userType,
            user: {
                id: user._id.toString(), // Convert ObjectId to string
                name: user.name,
                email: user.email,
                userType: user.userType
            }
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "An error occurred during login",
            error: error.message
        };
    }
}