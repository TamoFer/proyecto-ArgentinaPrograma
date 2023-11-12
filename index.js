const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas de mi aplicacion
app.use(require("./src/routes/alumnosRoute"));

app.listen(process.env.PORT||3000, () => console.log('Servidor corriendo en puerto 3000'));


module.exports = app;