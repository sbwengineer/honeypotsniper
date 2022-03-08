const express = require("express");
const cors = require("cors");
const app = express();
var corsOption = {
    origin: "*"
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./app/routes/Honeypot.routes.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} .`);
});