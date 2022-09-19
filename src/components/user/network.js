const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', (req, res) => {
    try{
        const list = controller.list();
        response.success(req, res, 'Lista de usuarios', 200, list);
    }catch(err){
        response.error(req, res, err.message, err.status, err.details);
    }
});

module.exports = router;