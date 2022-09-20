const auth = require('../auth');
const nanoid = require('nanoid')

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
            return Promise.reject('Invalid name');
        }

        const user = {
            id: nanoid(),
            name,
            username,
            password,
        };
        if (password || username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password,
            });
        }
        return await store.upsert(TABLE, user);
    };

    const remove = async (id) => {
        return await store.remove(TABLE, id);
    };

    return {
        list,
        get,
        upsert,
        remove,
    };
}