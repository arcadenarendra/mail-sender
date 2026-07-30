import express from "express";
import cors from "cors";
import mailRoutes from "./routes/mailRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mail Sender API is running 🚀"
  });
});

app.use("/send", mailRoutes);

app.use((error, req, res, next) => {
	if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
		return res.status(400).json({
			success: false,
			message: "Invalid JSON payload.",
		});
	}

	return next(error);
});

export default app;