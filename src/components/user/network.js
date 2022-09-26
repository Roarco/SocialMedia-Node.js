const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./index');
const secure = require('./secure');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createUser);
router.put('/:id',secure('update'), updateUser);
router.delete('/:id', deleteUser);

async function getAll(req, res, next) {
    try {
        const list = await controller.list();
        response.success(req, res, 'Lista de usuarios', 200, list);
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const { id } = req.params;
        const user = await controller.get(id);
        response.success(req, res, 'Usuario', 200, user);
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        const { name , username, password } = req.body;
        const user = await controller.upsert(name, username, password);
        response.success(req, res, 'Usuario creado', 201, user);
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await controller.remove(id);
        response.success(req, res, 'Usuario eliminado', 200, user);
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const user = await controller.update(id, data);
        response.success(req, res, 'Usuario actualizado', 200, user);
    } catch (err) {
        next(err);
    }
}

module.exports = router;