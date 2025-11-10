import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import skillRoutes from "./routes/skills.js";
import projectRoutes from "./routes/projects.js";
import evaluationRoutes from "./routes/evaluations.js";
import certificationRoutes from "./routes/certificates.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());  

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/certificates", certificationRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
