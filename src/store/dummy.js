const db ={
    user: [
        {id: '1', name: 'John Doe'},
        {id: '2', name: 'Jane Doe'},
    ],
};

const list = (table) => {
    return db[table];
};

const get = (table,id) => {
    return db[table].find(item => item.id === id);
};

const upsert = (table,data) => {
    db[table].push(data);
};

const remove = (table,id) => {
    return true;
};

module.exports = {
    list,
    get,
    upsert,
    remove,
};