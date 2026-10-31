import React, { useState, useEffect } from 'react';

function App() {
  const [destinos, setDestinos] = useState([]);
  const [nuevoDestino, setNuevoDestino] = useState({ nombre: '', departamento: '' });
  const API_URL = 'http://localhost:3000/api/destinos';

  const obtenerDestinos = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      setDestinos(datos);
    } catch (error) {
      console.error("Error al obtener destinos:", error);
    }
  };

  useEffect(() => {
    obtenerDestinos();
  }, []);

  const agregarDestino = async (e) => {
    e.preventDefault();
    if (!nuevoDestino.nombre || !nuevoDestino.departamento) {
      alert("Por favor llena el nombre y el departamento");
      return;
    }
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoDestino),
      });
      if (respuesta.ok) {
        setNuevoDestino({ nombre: '', departamento: '' });
        obtenerDestinos();
      }
    } catch (error) {
      console.error("Error al agregar destino:", error);
    }
  };

  const eliminarDestino = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (respuesta.ok) obtenerDestinos();
    } catch (error) {
      console.error("Error al eliminar destino:", error);
    }
  };

  return (
    <div className="contenedor-principal">
      <header className="header-verde">
        <h1>🇨🇴 Explora Colombia</h1>
        <p>Descubre los mejores destinos turísticos</p>
      </header>

      <section className="tarjeta-blanca">
        <h2>Agregar nuevo destino</h2>
        <form onSubmit={agregarDestino} className="formulario">
          <input
            type="text"
            placeholder="Nombre del destino"
            value={nuevoDestino.nombre}
            onChange={(e) => setNuevoDestino({ ...nuevoDestino, nombre: e.target.value })}
            className="input-gris"
          />
          <input
            type="text"
            placeholder="Departamento"
            value={nuevoDestino.departamento}
            onChange={(e) => setNuevoDestino({ ...nuevoDestino, departamento: e.target.value })}
            className="input-gris"
          />
          <button type="submit" className="btn-verde">Agregar destino</button>
        </form>
      </section>

      <section className="tarjeta-blanca">
        <h2>Destinos disponibles</h2>
        <div className="grid-destinos">
          {destinos.map((destino) => {
            
            let rutaFoto = "/img/fondo.jpg"; 
            
            if (destino.nombre.toLowerCase() === "cartagena") rutaFoto = "/img/cartagena.jpg";
            if (destino.nombre.toLowerCase() === "jardin") rutaFoto = "/img/jardin.jpg";
            if (destino.nombre.toLowerCase() === "salento") rutaFoto = "/img/salento.jpg";

            return (
              <div key={destino.id} className="tarjeta-destino">
                <img 
                  src={rutaFoto} 
                  alt={destino.nombre} 
                  className="imagen-destino" 
                />
                <div className="info-destino">
                  <h3>{destino.nombre}</h3>
                  <p>📍 {destino.departamento}</p>
                  <button onClick={() => eliminarDestino(destino.id)} className="btn-rojo">
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {destinos.length === 0 && <p className="mensaje-vacio">No hay destinos disponibles.</p>}
      </section>
    </div>
  );
}

export default App;