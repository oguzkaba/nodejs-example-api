const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const itemsRouter = require("./routes/items");
const itemRouter = require("./routes/items");
const personsRouter = require("./routes/persons");
const personRouter = require("./routes/persons");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
//app.use(express.json());
app.use(bodyParser.json());

// Set up Global configuration access
dotenv.config();

// Generating JWT
app.post("/user/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12
  }

  const token = jwt.sign(data, jwtSecretKey);

  res.json({ token: token });
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      return res.json({ "message": "Successfully Verified" });
    } else {
      // Access Denied
      return res.status(401).json({ "message": "Access Denied" });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ "status": "401", "message": "Access Denied" });
  }
});

let port = process.env.PORT || 5000;

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