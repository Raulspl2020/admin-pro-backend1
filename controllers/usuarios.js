
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs')
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const { restart } = require('nodemon');



const getUsuarios = async (req, res) => {

    const usuario = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuario: usuario,
        uid:req.uid
    })
}

// voy a leer el body
const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({ ok: false, msg: 'El correo ya existe' });
        }


        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {

        res.status(500).json({ ok: false, msg: 'Error inesperado... revisar logs' });

    }
}


const ActualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id',
            })
        }

        //TODO: validar token aqui y comprovar si es el usuario correcto
        // actualizaciones 

        const { password, google, email, ...campos } = req.body;

        // aqui la persona quiere cambiar un correo electronico que la existe en la bse de datos
        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya exixte un usuario con ese email'

                })

            }

        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }


}


const BorrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const usuarioBD = await Usuario.findById(uid);


        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

      await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg:'Usuario eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el usuario'
        })
        
    }

}


module.exports = {
    getUsuarios, crearUsuario, ActualizarUsuario, BorrarUsuario
}

