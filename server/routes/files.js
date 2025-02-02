const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Upload Route
router.post("/upload", auth, upload.single("file"), async (req, res) => {
    console.log("Request received:", req.body);
    console.log("Uploaded file:", req.file);

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const { user_id } = req.body;
        const file_name = req.file.filename;
        const file_path = req.file.path;

        await db.query(
            "INSERT INTO files (user_id, file_name, file_path) VALUES (?, ?, ?)",
            [user_id, file_name, file_path]
        );

        res.json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Database error", error });
    }
});

module.exports = router;
