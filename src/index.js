import express from "express";
import cors from "cors";
import { connection } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ObtenerAlumobos
app.get("/alumnos", (req, res) => {
  connection.query("SELECT id, nombre, edad FROM alumnos", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ObtenerCarreras
app.get("/carreras", (req, res) => {
  connection.query("SELECT id, nombre FROM carreras", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// RegistrarAlumno
app.post("/alumnos", (req, res) => {
  const { nombre, edad, carrera_id } = req.body;
  connection.query(
    "INSERT INTO alumnos (nombre, edad, carrera_id) VALUES (?, ?, ?)",
    [nombre, edad, carrera_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: results.insertId });
    }
  );
});

// ModificarAlumno
app.put("/alumnos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, edad, carrera_id } = req.body;
  connection.query(
    "UPDATE alumnos SET nombre=?, edad=?, carrera_id=? WHERE id=?",
    [nombre, edad, carrera_id, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ affectedRows: results.affectedRows });
    }
  );
});

// EliminarAlumno
app.delete("/alumnos/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM alumnos WHERE id=?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ affectedRows: results.affectedRows });
  });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
