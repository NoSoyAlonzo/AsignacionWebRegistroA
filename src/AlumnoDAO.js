import mysql from "mysql2"

const coneccion=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "RegristroA"

});


export default class AlumnoDAO {
  static registrar(alumno) {
    connection.query(
      "INSERT INTO alumnos (nombre, edad, carrera) VALUES (?, ?, ?)",
      [alumno.nombre, alumno.edad, alumno.carrera]
    );
  }

  static listar() {
    connection.query("SELECT * FROM alumnos", (err, results) => {
      if (err) throw err;
      console.table(results);
    });
  }

  static actualizar(id, nuevosDatos) {
    connection.query(
      "UPDATE alumnos SET nombre=?, edad=?, carrera=? WHERE id=?",
      [nuevosDatos.nombre, nuevosDatos.edad, nuevosDatos.carrera, id]
    );
  }

  static eliminar(id) {
    connection.query("DELETE FROM alumnos WHERE id=?", [id]);
  }
}