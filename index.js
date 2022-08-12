const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const itemsRouter = require("./routes/items");
const itemRouter = require("./routes/items");
const personsRouter = require("./routes/persons");
const personRouter = require("./routes/persons");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
//app.use(express.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({ extended: true })
);

app.get("/api/", (req, res) => {
  res.json({ message: "ok" });
});

//Swagger UI
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Item routes
app.use("/api/items/", itemsRouter);
app.use("/api/item/", itemRouter);

//Person routes
app.use("/api/persons/", personsRouter);
app.use("/api/person/", personRouter);

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