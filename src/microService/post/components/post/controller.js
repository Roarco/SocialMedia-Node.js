const nanoid = require('nanoid')
const boom = require('@hapi/boom');

const TABLE = 'post';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../../store/dummy');
    }

    const list = async () => {
        const posts = await store.list(TABLE);
        return posts.data;
    };

    const get = async (id) => {
        const post = await store.get(TABLE, id);
        if (post.length === 0) {
            throw boom.badRequest('Invalid post');
        }
        return post.data;
    };

    const upsert = async (text,user_id) => {
        if (!user_id || !text) {
            throw boom.badRequest('Invalid data');
        }

        const post = {
            id: nanoid(),
            text,
            user_id,
        };

        return await store.upsert(TABLE, post);
    };

    const remove = async (id) => {
        const post = await store.get(TABLE, id);
        if (post.length === 0) {
            throw boom.badRequest('Invalid post');
        }
        await store.remove(TABLE, id);
    };

    return {
        list,
        get,
        upsert,
        remove,
    };
};