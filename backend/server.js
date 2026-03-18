const express = require("express");
const bodyParser = require("body-parser");
const downloadRoute = require("./routes/download");

const app = express();

app.use(bodyParser.json());
app.use("/api", downloadRoute);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
