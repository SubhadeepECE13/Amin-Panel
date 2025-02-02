const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const fileRoutes = require("./routes/files");
const logRoutes = require("./routes/logs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "http://localhost:5173", credentials: true })); 

app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/logs", logRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
