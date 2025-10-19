
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { response } from "../utils/helperFunction.js";
import { sendMail } from "../utils/sendMail.js";
import { emailVerificationLink } from "../email/emailVerificationLink.js";
import "dotenv/config"

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json(response(false, 409, "User already exists"));
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    // Create email verification token (expires in 1h)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });

    // Send verification email
    const verifyLink = `${process.env.BASE_URL}/verify-email/${token}`;
    await sendMail(
      "Email Verification - Health Mate",
      email,
      emailVerificationLink(verifyLink)
    );

    return res.status(201).json(
      response(
        true,
        201,
        "Registration successful. Please check your email to verify your account."
      )
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json(response(false, 500, "Internal Server Error"));
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(response(false, 400, "Email and password are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json(response(false, 404, "User not found"));
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res
        .status(403)
        .json(response(false, 403, "Please verify your email before login"));
    }

    // Create login token (expires in 2h)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json(response(false, 500, "Internal Server Error"));
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json(response(false, 404, "User not found"));
    }

    if (user.isEmailVerified) {
      return res
        .status(200)
        .json(response(true, 200, "Email already verified"));
    }

    user.isEmailVerified = true;
    await user.save();

    return res
      .status(200)
      .json(response(true, 200, "Email verified successfully"));
  } catch (error) {
    console.error("Email Verification Error:", error);
    return res
      .status(400)
      .json(response(false, 400, "Invalid or expired token"));
  }
};