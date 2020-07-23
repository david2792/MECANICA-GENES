import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import pool from '../../conexionBD';
// import randtoken from 'rand-token';
// var randtoken = require('rand-token') ;
var refreshTokens = [];
class UsuarioControlador {
    /**
     * acceso al sistema
     */
    public async acceso(req: Request, res: Response): Promise<void> {
        var SECRET = "SECRETO_PARA_ENCRIPTACION"
        try {
            const usuario = await pool.query('SELECT * FROM vusuarios');
            JSON.stringify(usuario);
            const Usuario = usuario[0].Usuario;
            const Clave = usuario[0].Clave;
            const NivelUsuario = usuario[0].NivelUsuario;
            const value = { Usuario, Clave };
            const users = req.body.usuario;
            const pass = req.body.password;
            console.log(users)
            console.log(pass)
            if (users == Usuario && Clave == pass) {
                var tokenData = {
                    users: users,
                    pass: pass,
                    NivelUsuario: NivelUsuario

                    // ANY DATA
                }
                console.log("bienvenido")
                // var token = jwt.sign(users:users, SECRET, { expiresIn: '1h' , algorithm: 'RS256' })
                var token:string = jwt.sign(tokenData, 'Secret Password', {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                })
               // console.log(token)
                res.json(tokenData)
            }


        } catch (error) {

        }
    }

    public async verificar(req: Request, res: Response): Promise<void> {
        var SECRET = "SECRETO_PARA_ENCRIPTACION"
        var token = req.headers['authorization']
        if (!token) {
            res.status(401).send({
                error: "Es necesario el token de autenticación"
            })
            return
        }
        token = token.replace('Bearer ', '')

        jwt.verify(token, 'Secret Password', function(err, user) {
          if (err) {
            res.status(401).send({
              error: 'Token inválido'
            })
          } else {
            res.send({
              message: 'Awwwww yeah!!!!'
            });
          }
        });
    }
}

export const usuarioControlador = new UsuarioControlador();