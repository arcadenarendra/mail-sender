import app from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is required. Railway provides it automatically.");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
