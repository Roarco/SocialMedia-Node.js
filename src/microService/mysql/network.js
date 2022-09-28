const express = require('express');
const response = require('../../network/response');
const store = require('../../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', upsert);
router.put('/:table', update);
router.delete('/:table/:id', remove);


async function list(req, res, next) {
    try{
        const table = req.params.table;
        const data = await store.list(table);
        response.success(req, res, 'successful query', 200, data);
    }catch(err){
        next(err);
    }
}

async function get(req, res, next) {
    try{
        const table = req.params.table;
        const id = req.params.id;
        const data = await store.get(table, id);
        response.success(req, res, 'successful query', 200, data);
    }catch(err){
        next(err);
    }
}

async function upsert(req, res, next) {
    try{
        const table = req.params.table;
        const data = await store.upsert(table, req.body);
        response.success(req, res, 'successful query', 201, data);
    }catch(err){
        next(err);
    }
}

async function update(req, res, next) {
    try{
        const table = req.params.table;
        const data = await store.update(table, req.body);
        response.success(req, res,'successful query', 201, data);
    }catch(err){
        next(err);
    }
}

async function remove(req, res, next) {
    try{
        const table = req.params.table;
        const id = req.params.id;
        const data = await store.remove(table, id);
        response.success(req, res, 'successful query', 201, data);
    }catch(err){
        next(err);
    }
}

module.exports = router;