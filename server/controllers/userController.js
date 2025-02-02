exports.addUser = async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Correct SQL with all required fields
        await db.query(
            "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)", 
            [name, email, phone, hashedPassword, role || 'user']
        );
        
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
};