import "./config/env.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mailRoutes from "./routes/mailRoutes.js";

const app = express();

const rawCorsOrigins = process.env.CORS_ORIGIN ?? "";
const allowedCorsOrigins = rawCorsOrigins
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const corsOptions = {
	origin(origin, callback) {
		if (!origin) {
			return callback(null, true);
		}

		if (allowedCorsOrigins.length === 0 || allowedCorsOrigins.includes("*")) {
			return callback(null, true);
		}

		if (allowedCorsOrigins.includes(origin)) {
			return callback(null, true);
		}

		const error = new Error("Not allowed by CORS.");
		error.statusCode = 403;
		return callback(error);
	},
	methods: ["GET", "POST", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	optionsSuccessStatus: 204,
};

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		status: "ok",
		message: "Mail Sender API is live",
	});
});

app.get("/health", (req, res) => {
	return res.status(200).json({
		status: "ok",
	});
});

app.use("/send", mailRoutes);

app.use((req, res) => {
	return res.status(404).json({
		success: false,
		message: "Route not found.",
	});
});

app.use((error, req, res, next) => {
	if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
		return res.status(400).json({
			success: false,
			message: "Invalid JSON payload.",
		});
	}

	const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
	const message = statusCode === 500 ? "Internal server error." : error.message;

	console.error("Unhandled request error:", error);

	return res.status(statusCode).json({
		success: false,
		message,
	});
});

export default app;