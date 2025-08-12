import express from "express";

const app = express();

const PORT = 8000;

app.get((req, res) => {
  res.send("server running...");
});

app.listen(PORT, () => {
  console.log("Server listen at PORT : ", PORT);
});
