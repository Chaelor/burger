//npm dependencies
const mysql = require('mysql');
require('dotenv').config()

//creating the connection to the mysql server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.user,
    password: process.env.password,
    database: "burgers_db"
});

//Creating the connection to the server
connection.connect((err) => {
    if (err) throw err;

    console.log("Connected as id: " + connection.threadId);
});

//Expor connection for use in the orm
module.exports = connection;