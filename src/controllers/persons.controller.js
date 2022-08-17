const persons = require('../services/persons.service');

async function get(req, res, next) {
    try {
        res.json(await persons.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting persons `, err.message);
        next(err);
    }
}

async function create(req, res, next) {
    try {
        res.json(await persons.create(req.body));
    } catch (err) {
        console.error(`Error while creating person`, err.message);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        res.json(await persons.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating person`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        res.json(await persons.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting programming language`, err.message);
        next(err);
    }
}

module.exports = {
    get,
    create,
    update,
    remove
};