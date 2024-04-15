import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "309521",
    database: "travel"
});

export default db;
