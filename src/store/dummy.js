const db ={
    user: [
    ],
};

const list = (table) => {
    return  db[table];
};

const get = (table,id) => {
    return db[table].find(item => item.id === id);
};

const upsert = (table,data) => {
    if (!db[table]) {
        db[table] = [];
    }
    console.log(db);
    db[table].push(data);
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