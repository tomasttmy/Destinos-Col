const express = require('express');
const app = express();


app.use(express.json());


app.get('/', (req, res) => {
  res.send('¡API de Destinos funcionando correctamente!');
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, '0.0.0.0', () => {
  console.log(`API activa en el puerto ${PORT}`);
});
