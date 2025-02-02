const db = require("../config/db");

exports.assignTask = async (req, res) => {
    const { user_id, title, description } = req.body;

    try {
        await db.query("INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)", 
                       [user_id, title, description]);
        res.json({ message: "Task assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error assigning task", error });
    }
};

exports.getUserTasks = async (req, res) => {
    try {
        const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [req.params.id]);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};
