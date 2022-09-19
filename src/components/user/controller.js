
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

    const upsert = async (name) => {
        if (!name) {
            return Promise.reject('Invalid name');
        }

        const user = {
            name,
        };

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