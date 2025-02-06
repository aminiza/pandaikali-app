import Users from "../models/modelUser.js";
import argon2 from "argon2";

// login
export const login = async (req, res) => {
    const {username, password} = req.body;
    const users = await Users.findOne({
        where: {username}
    });

    if(!users) {
        return res.status(400).json({message: "User not found"});
    }

    const match = await argon2.verify(users.password, password);
    
    if(!match) {
        return res.status(400).json({message: "Invalid password"});
    }
    res.status(200).json({message: "Login success", user: users});
}

// register
export const register = async (req, res) => {
    try {
        const {username, password, confirmPassword} = req.body;
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({message: "All fields are required"});
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({message: "Password and confirm password do not match"});   
    }

    const existingUser = await Users.findOne({
        where: {username}
    })
    if(existingUser) {
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await argon2.hash(password);

    await Users.create({
        username,
        password: hashedPassword
    })
    res.status(201).json({message: "User register success"});
    } catch (error) {
        res.status(500).json({message: "Terjadi kesalahan server",error: error.message});
    }
}

// logout
export const logout = (req, res) => {
    if(!req.session) {
        return res.status(400).json({message: "Session not found"});
    }
    req.session.destroy((err) => {
        if(err) {
            return res.status(400).json({message: "Logout failed"});
        }
    });
    
    res.clearCookie('connect.sid');
    res.status(200).json({message: "Logout success"});
}