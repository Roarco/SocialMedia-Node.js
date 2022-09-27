const auth = require('../auth');
const nanoid = require('nanoid')
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

const TABLE = 'user';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    const list = async () => {
        return await store.list(TABLE);
    };

    const get = async (id) => {
        return await store.get(TABLE, id);
    };

    const upsert = async (name,username,password) => {
        if (!name || !username || !password) {
            throw boom.badRequest('Invalid data');
        }

        const user = {
            id: nanoid(),
            name,
            username,
            password: await bcrypt.hash(password, 5),
        };
        if (password || username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: user.password,
            });
        }
        return await store.upsert(TABLE, user);
    };

    const remove = async (id) => {
        const user = await store.get(TABLE, id);
        if (user.length === 0) {
            throw boom.badRequest('Invalid user');
        }
        await store.remove(TABLE, id);
    };

    const update = async (id, data) => {
        //validamos que data no este vacio
        if (!data || !Object.keys(data).length) {
            throw boom.badRequest('Invalid data');
        }
        return await store.update(TABLE, id, data);
    };

    return {
        list,
        get,
        upsert,
        remove,
        update,
    };
}