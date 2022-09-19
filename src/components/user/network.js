const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./index');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createUser);
router.delete('/:id', deleteUser);

async function getAll(req, res) {
    try {
        const list = await controller.list();
        response.success(req, res, 'Lista de usuarios', 200, list);
    } catch (err) {
        response.error(req, res, err.message, err.status, err.details);
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        const user = await controller.get(id);
        response.success(req, res, 'Usuario', 200, user);
    } catch (err) {
        response.error(req, res, err.message, err.status, err.details);
    }
}

async function createUser(req, res) {
    try {
        const { name } = req.body;
        const user = await controller.upsert(name);
        response.success(req, res, 'Usuario creado', 201, user);
    } catch (err) {
        response.error(req, res, err.message, err.status, err.details);
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await controller.remove(id);
        response.success(req, res, 'Usuario eliminado', 200, user);
    } catch (err) {
        response.error(req, res, err.message, err.status, err.details);
    }
}

module.exports = router;