const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../config/db.js");
const userController = require("../controllers/userController");

// Add user (using controller)
router.post("/add", auth, userController.addUser);

// Delete user
router.delete("/delete/:id", auth, async (req, res) => {
    try {
        // Use the pool to delete the user by ID
        const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
        
        // Check if any rows were affected (meaning the user was found and deleted)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Send a success response
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        // Catch any errors and return a server error message
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Assign role
// Route to update a user's role
router.put('/role-update/:id', auth, async (req, res) => {
    const userId = req.params.id;
    const { role_id } = req.body;

    // Validate input
    if (!role_id) {
        return res.status(400).json({ error: 'Role ID is required' });
    }

    try {
        // Check if the user and role exist in a single query
        const checkQuery = `
            SELECT u.id AS user_id, r.id AS role_id
            FROM users u
            LEFT JOIN roles r ON r.id = ?
            WHERE u.id = ?;
        `;

        const [results] = await pool.execute(checkQuery, [role_id, userId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!results[0].role_id) {
            return res.status(400).json({ error: 'Invalid Role ID' });
        }

        // Update the user's role
        const updateQuery = 'UPDATE users SET role_id = ? WHERE id = ?';
        const [updateResults] = await pool.execute(updateQuery, [role_id, userId]);

        if (updateResults.affectedRows === 0) {
            return res.status(400).json({ error: 'Failed to update user role' });
        }

        res.status(200).json({ message: 'User role updated successfully' });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

  
  

module.exports = router;