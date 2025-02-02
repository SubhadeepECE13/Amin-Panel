const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Assign task
router.post("/assign", auth, async (req, res) => {
    const { user_id, title, description } = req.body;

    try {
        await db.query("INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)", [user_id, title, description]);
        res.json({ message: "Task assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get tasks for user
router.get("/user/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [id]);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
