const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./index');

router.post('/login', login);

async function login(req, res) {
    try{
        const { username, password } = req.body;
        const user = await controller.login(username, password);
        response.success(req, res, 'Usuario logueado', 200, user);
    }catch(err){
        response.error(req, res, err.message, err.status, err.details);
    }
}

module.exports = router;