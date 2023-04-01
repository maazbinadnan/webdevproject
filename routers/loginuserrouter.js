// This is the router for the login
const LoginController = require('../controllers/LoginController');
const express = require('express');
const loginrouter = express.Router();
loginrouter.post("/login",LoginController.login);
module.exports=loginrouter