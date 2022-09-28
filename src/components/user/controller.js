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
        const users = await store.list(TABLE);
        return users.data;
    };

    const get = async (id) => {
        const user = await store.get(TABLE, id);
        if (user.length === 0) {
            throw boom.badRequest('Invalid user');
        }
        return user.data;
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

    const follow = async (from, to) => {
        return await store.upsert(TABLE + '_follow', {
            user_from: from,
            user_to: to,
        });
    };

    const following = async (user) => {
        const join = {};
        join[TABLE] = 'user_to';
        const query = { user_from: user };
        const following = await store.query(TABLE + '_follow', query, join);
        // eliminamos el campo password de la respuesta
        return following.map((follow) => {
            delete follow.password;
            return follow;
        });
    };
    return {
        list,
        get,
        upsert,
        remove,
        update,
        follow,
        following,
    };
}