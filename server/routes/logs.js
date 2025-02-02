const express = require("express");
const db = require("../config/db"); // Assuming db connection is set up
const auth = require("../middleware/auth");

const router = express.Router();

// Log User Activity (Add, Delete, Update Roles)
const logUserActivity = async (action, userId, details) => {
    try {
        await db.query("INSERT INTO logs (action, user_id, details, timestamp) VALUES (?, ?, ?, ?)", [
            action,
            userId,
            details,
            new Date(),
        ]);
    } catch (error) {
        console.error("Error logging user activity:", error);
    }
};

// Log Task Activity (Assign tasks)
const logTaskActivity = async (action, taskId, userId, details) => {
    try {
        await db.query("INSERT INTO logs (action, task_id, user_id, details, timestamp) VALUES (?, ?, ?, ?, ?)", [
            action,
            taskId,
            userId,
            details,
            new Date(),
        ]);
    } catch (error) {
        console.error("Error logging task activity:", error);
    }
};

// Log File Upload Activity
const logFileUploadActivity = async (userId, fileName) => {
    try {
        await db.query("INSERT INTO logs (action, user_id, details, timestamp) VALUES (?, ?, ?, ?)", [
            "File Upload",
            userId,
            `File uploaded: ${fileName}`,
            new Date(),
        ]);
    } catch (error) {
        console.error("Error logging file upload activity:", error);
    }
};

// Log Authentication Activity (Admin Login)
const logAuthenticationActivity = async (userId, status) => {
    try {
        await db.query("INSERT INTO logs (action, user_id, details, timestamp) VALUES (?, ?, ?, ?)", [
            "Login",
            userId,
            `Login attempt: ${status}`,
            new Date(),
        ]);
    } catch (error) {
        console.error("Error logging authentication activity:", error);
    }
};

// Use these logging functions where necessary in your existing routes:

// Add user (with log)
router.post("/add", auth, async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Add user logic (bcrypt, db queries)
        const userId = 123; // Dummy user id, adjust to your actual logic
        await logUserActivity("User Added", userId, `Added user: ${name} with email: ${email}`);

        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete user (with log)
router.delete("/delete/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        // Delete user logic
        await logUserActivity("User Deleted", id, `Deleted user with ID: ${id}`);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Assign task (with log)
router.post("/assign", auth, async (req, res) => {
    const { user_id, title, description } = req.body;

    try {
        // Insert task into DB
        const taskId = 456; // Dummy task id
        await logTaskActivity("Task Assigned", taskId, user_id, `Assigned task: ${title} to user: ${user_id}`);

        res.json({ message: "Task assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// File upload (with log)
router.post("/upload", auth, async (req, res) => {
    const { user_id } = req.body;
    const file_name = req.file.filename;

    try {
        // Upload logic
        await logFileUploadActivity(user_id, file_name);

        res.json({ message: "File uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin login (with log)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        // Add authentication logic (bcrypt, jwt)
        const loginStatus = user ? "Success" : "Failed";
        await logAuthenticationActivity(user ? user.id : null, loginStatus);

        res.json({ message: loginStatus === "Success" ? "Login successful" : "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
