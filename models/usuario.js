const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        uniqued: true

    },
    password: {
        type: String,
        require: true

    },
    img: {
        type: String,


    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'

    },
    google: {
        type: Boolean,
        default: false

    }
});

// como extraer campos para que no se muestren
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    object.clave = password;
    return object;
})


module.exports = model('Usuario', UsuarioSchema);




