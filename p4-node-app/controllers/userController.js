import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const register = async (req, res) => {
    const {name, username, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        username,
        password: hashedPassword,
    });

    res.json({message: "Successfully registered!"});
};

const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (!user) {
        res.json({error: "Invalid credential"});
        return;
    };

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        res.json({error: "Invalid credential"});
        return;
    };

    req.session.userId = user._id;

    res.json({message: "Logged in successfully!"});
};

const logout = (req,res) => {
    req.session.destroy((error) => {
        if (error){
            res.json({error: error.message});
            return;
        };
    });

    res.clearCookie("connect.sid");
    res.json({message: "Logged out successfully"});
};


export {register, login, logout}; 