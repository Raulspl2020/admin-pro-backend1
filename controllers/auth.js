//const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs')
const { response } = require('express');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
//const router = require('../routes/usuarios');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //VERIFICAR EMAIL
        const usuarioBD = await usuario.findOne({ email })
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no exixte'
            });
        }

        //VETFICAR CONTRASEÑA
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no encontrada'
            });
        }

        // generar el roken - JWT
        const token= await generarJWT(usuarioBD.id);

        

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }



}

module.exports = { login };