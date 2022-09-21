const bcrypt = require('bcryptjs');
const auth = require('../../auth');
const TABLE = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    const login = async (username, password) => {
        if (!username || !password) {
            throw new Error('Invalid information');
        }

        const data = await store.query(TABLE, { username: username });

        if (await bcrypt.compare(password, data[0].password)) {
            return auth.sign(data[0]);
        } else {
            throw new Error('Password incorrect or user not found');
        }
    };

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
        login,
    };
}