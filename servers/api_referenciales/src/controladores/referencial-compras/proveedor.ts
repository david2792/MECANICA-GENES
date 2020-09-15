import { Request, Response } from 'express';
import pool from '../../conexionBD';
import trasaccion from '../../transaccionBD';

class ProveedorControlador {
    public async recuperCodigo(req: Request, res: Response): Promise<any>{
        const codigoMaximo = await pool.query('SELECT MAX(CodigoSucursal)+1 AS codigo FROM vproveedores');
        JSON.stringify(codigoMaximo);
        const codigo = codigoMaximo[0].codigo;
        console.log(codigo);
        res.json(codigo);
    }

    public async listarProveedores(req: Request, res:Response): Promise<any>{
        const vproveedores = await pool.query('SELECT * FROM vproveedores');
        console.log('Hello friends');
        res.json(vproveedores);
    }
}
export const proveedorControlador = new ProveedorControlador();