import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const newUser = new User({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({ success: true, message: "User signup successfull" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Auth Failed email or password Wrong",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({
        message: "Cannot login Password is Incorrect",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.status(200).json({
      message: "User signup successfull",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
    console.log(error);
  }
};
