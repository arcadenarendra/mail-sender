import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mailRoutes from "./routes/mailRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mailRoutes);

export default app;