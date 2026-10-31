const express = require("express");
const cors = require("cors");

const app = express();
const PORT =process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let destinos = [
  { id: 1, nombre: "Jardin", departamento: "Antioquia" },
  { id: 2, nombre: "Cartagena", departamento: "Bolívar" },
  { id: 3, nombre: "Salento", departamento: "Quindío" }
];

app.get("/api/destinos", (req, res) => {
  res.json(destinos);
});

app.get("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);
  const destino = destinos.find(d => d.id === id);
  if (!destino) return res.status(404).json({ mensaje: "Destino no encontrado" });
  res.json(destino);
});

app.post("/api/destinos", (req, res) => {
  const { nombre, departamento } = req.body;
  if(!nombre || !departamento) {
    return res.status(400).json({ mensaje: "Debes enviar nombre y departamento" });
  }
  const nuevoDestino = {
    id: Math.max(0, ...destinos.map(d => d.id)) + 1,
    nombre: nombre.trim(),
    departamento: departamento.trim()
  };
  destinos.push(nuevoDestino);
  res.status(201).json(nuevoDestino);
});

app.put("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nombre, departamento } = req.body;
  const destino = destinos.find(d => d.id === id);
  if (!destino) return res.status(404).json({ mensaje: "Destino no encontrado" });
  
  if (typeof nombre !== "string" || !nombre.trim() || typeof departamento !== "string" || !departamento.trim()) {
    return res.status(400).json({ mensaje: "Debes enviar nombre y departamento" });
  }
  destino.nombre = nombre.trim();
  destino.departamento = departamento.trim();
  res.json(destino);
});

app.delete("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = destinos.findIndex(d => d.id === id);
  if (indice === -1) return res.status(404).json({ mensaje: "Destino no encontrado" });
  destinos.splice(indice, 1);
  res.json({ mensaje: "Destino eliminado correctamente" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API activa en http://localhost:${PORT}`);
});