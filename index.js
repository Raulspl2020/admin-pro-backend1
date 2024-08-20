require('dotenv').config();//Mantiene información sensible fuera del código fuente .env
const express=require('express');
const cors = require('cors')// Acepte solicitudes desde diferentes dominios

const {dbconexion}=require('./database/config')

const app=express();

//los midelwar son funciones que se ejecutan antes de llagr a otras

// configurar CORS
app.use(cors())

//Lectura y parseo del body
app.use(express.json());

//BASE DE DATOS
dbconexion();


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.DB_PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.DB_PORT );
});