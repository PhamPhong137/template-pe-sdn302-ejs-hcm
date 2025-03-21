const express = require('express');
const apiController = require('../controller/api.controller');


const ApiRouter = express.Router();

ApiRouter.post("/login", apiController.login); 
ApiRouter.post("/register", apiController.register);   


module.exports = ApiRouter;