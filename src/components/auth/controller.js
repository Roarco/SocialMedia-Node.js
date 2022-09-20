
const TABLE = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    const upsert = async (data) => {
        const authData = {
            id: data.id,
        };

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return await store.upsert(TABLE, authData);
    };

    return {
        upsert,
    };
}