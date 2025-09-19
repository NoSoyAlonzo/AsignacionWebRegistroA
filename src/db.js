import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "db_escuela"
});

connection.connect(err => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});
 