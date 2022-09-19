const express = require('express');
const router = express.Router();
const response = require('../../network/response');

router.get('/', (req, res) => {
    try{
        response.success(req, res, 'Lista de usuarios', 200, ['user1', 'user2']);
    }catch(err){
        response.error(req, res, err.message, err.status, err.details);
    }
});

module.exports = router;