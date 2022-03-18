const express = require('express');
const app = express();
const morgan = require('morgan');

//Configuraciones
app.set('port',3000);
app.set('json spaces',2);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.use('/hargrow',require('./Routes/rutas'));

//Empezando el proyecto
app.listen(app.get('port'));
console.log('API ACTUALIZADA') 
