const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!user || user.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user[0].id, name: user[0].name, role: user[0].role } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
