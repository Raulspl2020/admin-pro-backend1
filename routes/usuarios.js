
/*
Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuario,  ActualizarUsuario, BorrarUsuario} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', validarJWT ,getUsuarios)

//Creando usuarios
router.post('/', [ validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El Correo es obligatorio').isEmail(),
    validarCampos,
],
    crearUsuario
);
// Actualizando Usuarios
router.put('/:id', [ validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,

], ActualizarUsuario
);


// Eliminando Usuarios
router.delete('/:id', validarJWT, BorrarUsuario);


module.exports = router;
