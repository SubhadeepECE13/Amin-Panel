const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

// Add user (using controller)
router.post("/add", auth, userController.addUser);

// Delete user
router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Assign role
router.put("/assign-role/:id", auth, async (req, res) => {
    const validRoles = [ 'team_leader', 'telecaller'];
    if (!validRoles.includes(req.body.role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    try {
        const [result] = await db.query(
            "UPDATE users SET role = ? WHERE id = ?",
            [req.body.role, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Role updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;