import bcrypt from "bcrypt";
import Users from "../models/userModel.js";

const register = async (req, res) => {
  try {
    const { name, username, email, password, contactNum } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
      name,
      username,
      email,
      password: hashedPassword,
      contactNum,
    });

    res.json({ message: "Successfully registered!" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user) {
      res.json({ error: "Invalid credential" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.json({ error: "Invalid credential" });
      return;
    }

    req.session.userId = user._id;

    res.json({ message: "Logged in successfully!" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.json({ error: error.message });
        return;
      }
    });

    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
    console.log("logged out") //DELETE
  } catch (err) {
    res.json({ error: err.message });
  }
};

export { register, login, logout };
