import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../Models/users.js';
import { generateCookie } from '../utils/feature.js';
// Register
export const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(404).json({
        success: false,
        message: "User already exists.."
    })
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name, email, password: hashedPassword
    });
    generateCookie(user, res, 201, "User Register Successfully");
}

//login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({
        success: false,
        message: "User not exists.."
    })
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({
        success: false,
        message: "Invalid Crendentials !"
    })
    generateCookie(user, res, 201, `Welcome ${user.name}`);
}
export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message:
            "You are Logout successfully!"
    })
}

export const getMyProfile = (req, res) => {
    res.status(200).json({
        suucess: true,
        user: req.user
    })
}