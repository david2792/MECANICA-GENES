import { Request, Response } from 'express';
import pool from '../../conexionBD';
import trasaccion from '../../transaccionBD';

class TimbradoControlador {
    public async recuperarCodigo(req: Request, res:Response): Promise<any>{
        const codigomaximo = await pool.query('SELECT MAX(NumeroTimbrado)+1 AS codigo FROM timbrados');
        JSON.stringify(codigomaximo);
        const codigo = codigomaximo[0].codigo;
        console.log(codigo);
        res.json(codigo)
    }

    public async listarTimbrados(req: Request, res: Response) {
        const timbrados = await pool.query('SELECT * FROM timbrados');
        console.log(timbrados)
        res.json(timbrados);
      }
}

export const timbradoControlador = new TimbradoControlador();