const db ={
    user: [
        {id: '1', name: 'John Doe'},
        {id: '2', name: 'Jane Doe'},
    ],
};

const list = (table) => {
    return  db[table];
};

const get = (table,id) => {
    return db[table].find(item => item.id === id);
};

const upsert = (table,data) => {
    const lastId = db[table][db[table].length - 1].id;
    const newIdIn = parseInt(lastId) + 1;
    const newId = newIdIn.toString();
    const newData = {
        id: newId,
        ...data,
    }
    db[table].push(newData);
};

const remove = (table,id) => {
    db[table] = db[table].filter(item => item.id !== id);
};

module.exports = {
    list,
    get,
    upsert,
    remove,
};