const mongoose = require('mongoose');



const dbconexion = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB en Linea')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');

    }

}

module.exports = {
    dbconexion
}
