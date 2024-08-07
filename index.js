require('dotenv').config();//Mantiene información sensible fuera del código fuente .env
const express=require('express');
const cors = require('cors')// Acepte solicitudes desde diferentes dominios

const {dbconexion}=require('./database/config')

const app=express();

// configurar CORS
app.use(cors())

//BASE DE DATOS
dbconexion();

//console.log(process.env);
//QAZRFV1209
//hospital_user


app.get('/api/usuarios',(req,res)=>{
    res.json({
        ok: true,
        usuarios:[{
            id:123,
            nombre:'Raul Rodrguez'
        }]
    })
})



app.listen( process.env.DB_PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.DB_PORT );
});