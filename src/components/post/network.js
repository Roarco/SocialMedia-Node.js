const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./index');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createPost);
router.delete('/:id', deletePost);

async function getAll(req, res, next) {
    try {
        const list = await controller.list();
        response.success(req, res, 'Lista de Post', 200, list);
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const { id } = req.params;
        const post = await controller.get(id);
        response.success(req, res, 'Post', 200, post);
    } catch (err) {
        next(err);
    }
}

async function createPost(req, res, next) {
    try {
        const { text, user_id } = req.body;
        const post = await controller.upsert(text, user_id);
        response.success(req, res, 'Post creado', 201, post);
    } catch (err) {
        next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        const { id } = req.params;
        const post = await controller.remove(id);
        response.success(req, res, 'Post eliminado', 200, post);
    } catch (err) {
        next(err);
    }
}

module.exports = router;