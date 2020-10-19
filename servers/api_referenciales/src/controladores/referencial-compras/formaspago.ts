import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class FormasPagoControlador {
    public async recuperCodigo(req: Request, res: Response): Promise<any>{
        const codigoMaximo = await pool.query('SELECT MAX(CodigoFormasPago)+1 AS codigo FROM formaspago');
        JSON.stringify(codigoMaximo);
        const codigo = codigoMaximo[0].codigo;
        console.log(codigo);
        res.json(codigo);
    }

    public async listarFpago(req: Request, res:Response): Promise<any>{
        const fpago = await pool.query('SELECT * FROM formaspago');
        res.json(fpago);
    }

    public async crear(req: Request, res: Response):Promise<void>{
        let FormasPago = req.body.fpago;
        console.log("Datos del proveedor recibidos correctamente: ", FormasPago);
        const Codigo = await pool.query("SELECT MAX(CodigoFormasPago)+1 AS Codigo FROM formaspago" );
        JSON.stringify(Codigo);
        const CodigoFormasPago = Codigo[0].Codigo;
        const Descripcion = FormasPago.Descripcion;
        const Plazo = FormasPago.Plazo;
        const Dias = FormasPago.Dias;
        const values= {CodigoFormasPago, Descripcion, Plazo, Dias};
        console.log(values);
        await pool.query("INSERT INTO proveedores SET ?", values);
        const vproveedores = await pool.query('SELECT * FROM vproveedores');
        res.json(vproveedores);
    }

    public async actualizar(req: Request, res: Response):Promise<void>{
        let Proveedor = req.body.proveedores;
        await  transaccion.query("SET autocommit=0");
        console.log("Datos del proveedor recibidos correctamente: ", Proveedor);
        const CodigoProveedor = Proveedor.CodigoProveedor;
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
        await pool.query("UPDATE proveedores SET ? WHERE CodigoProveedor = ?", [values, CodigoProveedor]);
        await transaccion.query("COMMIT");// se confirma la transaccion
        await transaccion.query("SET autocommit=1")
        const vproveedores = await pool.query('SELECT * FROM vproveedores');
        res.json(vproveedores);
    }
}
export const formasPagoControlador = new FormasPagoControlador();