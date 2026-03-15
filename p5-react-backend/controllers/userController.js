import bcrypt from "bcrypt";
import Users from "../models/userModel.js";

const register = async (req, res) => {
    try {
    const {name, username, email, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
        name,
        username,
        email,
        password: hashedPassword,
    });
    res.json({message: "Successfully registered!"})

    } catch(error) {
        console.log("Error!", error)
    };
};

const login = async (req,res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({username});

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

    res.json({message: "Logged in successfully!"})
};

const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error){
            res.json({error: error.message});
            return;
        }
        res.clearCookie("connect.sid")
        res.json({message: "Logged out successfully"})
    })
};

const session = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ authenticated: false });
  }

  const user = await Users.findById(req.session.userId).select("-password");

  res.json({
    authenticated: true,
    user,
  });
};

export {register, login, logout, session};