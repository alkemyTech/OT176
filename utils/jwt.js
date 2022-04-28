const { sign, verify } = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')

const createToken = (id, expiresIn = 60 * 60) => {
  return new Promise((resolve, reject) => {
    if (!id) return reject('datos invalidos')
    return sign({ id }, jwt_secret, { expiresIn }, (err, token) => {
      if (err) return reject('token invalido')
      resolve(token)
    })
  })
}

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    if (!token) return reject('token invalido')
    return verify(token, jwt_secret, {}, (err, decode) => {
      if (err) return reject('tu sesion ha expirado, volve a ingresar')
      resolve(decode)
    })
  })
}

module.exports = { createToken, verifyToken }
