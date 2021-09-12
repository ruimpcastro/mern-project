import express from "express";
import cors from "cors";
import equipment from "./api/green.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/equipment", equipment);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

export default app;
