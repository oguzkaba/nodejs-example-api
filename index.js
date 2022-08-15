const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const itemsRouter = require("./routes/items");
const itemRouter = require("./routes/items");
const personsRouter = require("./routes/persons");
const personRouter = require("./routes/persons");
const authRouter = require("./routes/login.js");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const dotenv = require('dotenv');
const checkAuth = require('./middlewares/checkauth');

//app.use(express.json());
app.use(bodyParser.json());

// Set up Global configuration access
dotenv.config();

//Swagger UI
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Item routes
app.use("/api/items/", checkAuth, itemsRouter);
app.use("/api/item/", checkAuth, itemRouter);

//Person routes
app.use("/api/persons/", checkAuth, personsRouter);
app.use("/api/person/", checkAuth, personRouter);

//Auth routes
app.use("/api/auth/", authRouter);

app.use(
  bodyParser.urlencoded({ extended: true })
);

app.get("/api/", (req, res) => {
  res.json({ message: "ok" });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});