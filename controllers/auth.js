import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER

export const register = async (req, res) =>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};


// LOGGING IN

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(400).json({message: "User does not exist."});

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const { password, ...data } = user._doc;
        res.status(200).json({ token, data })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}