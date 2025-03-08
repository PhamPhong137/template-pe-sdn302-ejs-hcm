const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const connectDb = require("./config/db");
const db = require("./models");
const ApiRouter = require("./router/api.route");


const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

//Set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "layouts/layout");

app.use(express.static('public'));

app.get("/", async (req, res, next) => {
    res.status(200).send({ message: "Welcome to Restful API server" });
});

app.get("/login", async (req, res, next) => {
    res.render('pages/index');
});


//Recieve request 
app.use("/", ApiRouter);

app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Bad request"));
});

app.use(async (err, req, res, next) => {
    res.status = err.status || 500,
        res.send({
            "error": {
                "status": err.status || 500,
                "message": err.message
            }
        });
})

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at: http://${HOSTNAME}:${PORT}`);
    //Connect database 
    connectDb();
});