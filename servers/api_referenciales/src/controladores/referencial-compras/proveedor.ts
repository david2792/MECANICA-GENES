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

    public async crear(req: Request, res: Response):Promise<void>{
        let Proveedor = req.body.proveedores;
        console.log("Datos del proveedor recibidos correctamente: ", Proveedor);
        const Codigo = await pool.query("SELECT MAX(CodigoProveedor)+1 AS Codigo FROM proveedores" );
        JSON.stringify(Codigo);
        const CodigoProveedor = Codigo[0].Codigo;
        const RazonSocial = Proveedor.RazonSocial;
        const Cedula = Proveedor.Cedula;
        const Ruc = Proveedor.Ruc;
        const Direccion = Proveedor.Direccion;
        const Telefono = Proveedor.Telefono;
        const Email = Proveedor.Email;
        const Web = Proveedor.Web;
        const CodigoCiudad = Proveedor.CodigoCiudad;
        const values= {CodigoProveedor, RazonSocial, Cedula, Ruc, Direccion, Telefono, Email, Web, CodigoCiudad};
        console.log(values);
        await pool.query("INSERT INTO proveedores SET ?", values);
        const vproveedores = await pool.query('SELECT * FROM vproveedores');
        res.json(vproveedores);
    }
}
export const proveedorControlador = new ProveedorControlador();