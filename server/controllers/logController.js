const db = require("../config/db");

exports.getLogs = async (req, res) => {
    try {
        const [logs] = await db.query("SELECT * FROM logs ORDER BY timestamp DESC");
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving logs", error });
    }
};
