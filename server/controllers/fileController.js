const db = require("../config/db");

exports.uploadFile = async (req, res) => {
    try {
        console.log("File Upload Request:", req.body);
        console.log("File Details:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { user_id } = req.body;
        const filePath = req.file.path;

        await db.query(
            "INSERT INTO files ( file_name, file_path) VALUES (?, ?, ?)",
            [user_id, req.file.filename, filePath]
        );

        res.json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file", error });
    }
};

exports.getUserFiles = async (req, res) => {
    try {
        const [files] = await db.query("SELECT * FROM files WHERE user_id = ?", [req.params.id]);
        res.json(files);
    } catch (error) {
        console.error("Error retrieving files:", error);
        res.status(500).json({ message: "Error retrieving files", error });
    }
};
