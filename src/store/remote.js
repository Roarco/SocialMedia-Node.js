const axios = require('axios')


function createRemoteDB(host, port){
    const URL = `http://${host}:${port}`

    async function list(table){
        try{
            const { data } = await axios.get(`${URL}/${table}`)
            return data
        }catch(err){
            console.error(err)
        }
    }

    async function get(table, id){
        try{
            const { data } = await axios.get(`${URL}/${table}/${id}`)
            return data
        }catch(err){
            console.error(err)
        }
    }

    async function upsert(table, data){
        try{
            const { response } = await axios.post(`${URL}/${table}`, data)
            return response
        }catch(err){
            console.error(err)
        }
    }

    async function remove(table, id){
        try{
            const { data } = await axios.delete(`${URL}/${table}/${id}`)
            return data
        }catch(err){
            console.error(err)
        }
    }

    async function update(table, id, data){
        try{
            const { response } = await axios.patch(`${URL}/${table}/${id}`, data)
            return response
        }catch(err){
            console.error(err)
        }
    }

    async function query(table, query, join){
        try{
            const { data } = await axios.post(`${URL}/${table}/query`, { query, join })
            return data
        }catch(err){
            console.error(err)
        }
    }

    return {
        list,
        get,
        upsert,
        remove,
        update,
        query
    }
}

module.exports = createRemoteDB