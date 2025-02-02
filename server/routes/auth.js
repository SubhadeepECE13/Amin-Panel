const express = require("express");

const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// Admin Login
// Admin Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.query("SELECT * FROM admin WHERE email = ?", [email]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Directly compare the passwords (not recommended for production)
        if (password !== user[0].password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user[0].id, email: user[0].email, role: user[0].role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
