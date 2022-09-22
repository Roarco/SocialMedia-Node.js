const db ={
    user: [
    ],
    auth: [
    ]
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
    db[table].push(data);
};

const remove = (table,id) => {
    db[table] = db[table].filter(item => item.id !== id);
};

const query = (table,quer) => {
    return db[table].filter(item => item.username === quer.username);
};

const update = (table,id,data) => {
    //buscamos el elemento que queremos actualizar
    const index = db[table].findIndex(item => item.id === id);
    //actualizamos unicamente los datos que nos llegan
    db[table][index] = {
        ...db[table][index],
        ...data
    };
};


module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
    update,
};