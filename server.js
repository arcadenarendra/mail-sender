import app from "./app.js";

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("MAIL:", process.env.MAIL);
console.log("PASS exists:", !!process.env.PASS);