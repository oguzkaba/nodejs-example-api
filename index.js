const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const itemsRouter = require("./routes/items");
//app.use(express.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({ extended: true })
);

app.get("/api/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api/items/", itemsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});