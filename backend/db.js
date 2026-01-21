const {Pool} = require('pg');

const pool = new Pool(
    {
        user:'postgres',
        host:'localhost',
        database:'appvue',
        password:'Michou13',
        port:'7146',
    });

const query = (text, params) => {
    return pool.query(text,params);
};

module.exports = {query};