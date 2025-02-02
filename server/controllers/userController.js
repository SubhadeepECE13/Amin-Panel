const pool = require('../config/db.js'); 



exports.addUser = async (req, res) => {
    const { name, email, phone, role_id } = req.body;
    
    if (!name || !email || !phone || !role_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Updated query with dynamic fields from req.body
        const query = "INSERT INTO users (name, email, phone, role_id) VALUES (?, ?, ?, ?)";
        const values = [name, email, phone, role_id || 'user'];

        // Using the pool to query the database
        await pool.execute(query, values);

        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
};
