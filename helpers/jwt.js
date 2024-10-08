const jwt = require('jsonwebtoken')


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SECRE,
            {
                expiresIn: '12h'
            }, (err, token) => {


            if (err) {
                console.log(err);
                reject('No se pudo genrar el JWT')
            } else {
                resolve(token);
            }

        })

    });


}



module.exports={
    generarJWT
}




