const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const nodemailer = require("nodemailer");
const User = require("../models/User");

// 📧 Configure Nodemailer Email Transporter
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Brevo SMTP Error:", error);
    } else {
        console.log("Brevo SMTP Ready!");
    }
});

// ==========================================
// 🚀 ENDPOINT 1: USER SIGNUP (With Safe Email Sequence)
// ==========================================
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please fill out all input fields." });
        }

        // 1. Query the actual database collection
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "An account with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const codeExpiry = Date.now() + 15 * 60 * 1000; // Code expires in 15 minutes

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpires: codeExpiry,
            isVerified: false // Ensure it explicitly defaults to false
        });

        // 2. Prepare the Email Configuration Layout
        const mailOptions = {
            from: `"ShuriAI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your ShuriAI Account 🔑",
            html: `
                <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 10px;">
                    <h2 style="color: #38bdf8;">Welcome to ShuriAI, ${name}!</h2>
                    <p>Thank you for starting your language journey with us. Please use the verification code below to activate your account:</p>
                    <div style="background-color: #1e293b; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; color: #22d3ee; border-radius: 5px; margin: 20px 0;">
                        ${verificationCode}
                    </div>
                    <p style="font-size: 12px; color: #94a3b8;">This code will expire in 15 minutes.</p>
                </div>
            `,
        };

        // 3. Isolated Email Handshake (Send email BEFORE saving)
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Verification code successfully routed to: ${email}`);
        } catch (emailError) {
            console.error("Nodemailer Service Failure Error:", emailError);
            return res.status(500).json({ 
                msg: "Failed to send verification email. Please verify your backend SMTP configurations." 
            });
        }

        // 4. Save to MongoDB Atlas ONLY if the email step succeeded completely!
        await newUser.save();
        
        return res.status(201).json({ msg: "CHECK YOUR EMAIL FOR VERIFICATION CODE! ✉️" });
        
    } catch (error) {
        console.error("Signup Route Error:", error);
        return res.status(500).json({ msg: "Internal Error during signup." });
    }
});

// ==========================================
// 🛡️ ENDPOINT 2: VERIFY CODE
// ==========================================
router.post("/verify-code", async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ msg: "Please provide your email and verification code." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User account not found." });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: "Account is already verified. You can log in." });
        }

        // Check if code matches and is still valid
        if (user.verificationCode !== code || user.verificationCodeExpires < Date.now()) {
            return res.status(400).json({ msg: "Invalid or expired verification code." });
        }

        // Activate the user account
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        return res.json({ msg: "Account verified successfully! 🎉 You can now sign in." });

    } catch (error) {
        console.error("Verification Error:", error);
        return res.status(500).json({ msg: "Server error during verification process." });
    }
});

// ==========================================
// 🔑 ENDPOINT 3: USER LOGIN (With Verification Protection)
// ==========================================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter both email and password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid login credentials." });
        }

        // 🛑 Block access if not verified
        if (!user.isVerified) {
            return res.status(403).json({ 
                msg: "Your account is not verified yet. Please check your email inbox.",
                requiresVerification: true 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid login credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            },
        });

    } catch (error) {
        console.error("Login Route Error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
});

module.exports = router;