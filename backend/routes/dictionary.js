const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// ==========================================
// 🚀 ENDPOINT: APPEND WORD ENTRY VALUE TO HISTORY LOGGER ARRAY
// ==========================================
router.post("/history", authMiddleware, async (req, res) => {
    try {
        const { word } = req.body;
        if (!word) return res.status(400).json({ msg: "Keyword string value missing." });

        // ⚡ CONCEPT ACTION: Target and append data using atomic Mongo operators ($push)
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $push: { searchHistory: { word: word.trim().toLowerCase() } } },
            { new: true } // Return modified document layout
        );

        if (!user) return res.status(404).json({ msg: "Profile query missing inside systems mapping databases." });

        res.json({ updatedHistory: user.searchHistory });

    } catch (error) {
        console.error("Dictionary Mutation Error Logging:", error);
        res.status(500).json({ msg: "Server failed history array compilation mutations." });
    }
});

// ==========================================
// 🚀 ENDPOINT: UPDATE ACCOUNT PROFILE IMAGE VECTOR (Base64 Stream Handling)
// ==========================================
router.put("/profile-picture", authMiddleware, async (req, res) => {
    try {
        const { profilePicture } = req.body;
        if (!profilePicture) return res.status(400).json({ msg: "Base64 payload string data missing." });

        // Update the user document target records array
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture: profilePicture },
            { new: true }
        );

        if (!user) return res.status(404).json({ msg: "User account records missing." });

        res.json({ msg: "Profile canvas synchronized.", profilePicture: user.profilePicture });

    } catch (error) {
        console.error("Profile Mutation Error Logging:", error);
        res.status(500).json({ msg: "Server failed binary data stream storage updates." });
    }
});

module.exports = router;