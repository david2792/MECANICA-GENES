import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class VehiculoControlador {
    public async listar(req: Request, res: Response) {
        const marcas = await pool.query('SELECT * FROM vclientevehiculos');
        res.json(marcas);
    }

    public async listarUno(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const marcas = await pool.query('SELECT * FROM tracciones WHERE codigo=?', [id]);
        if (marcas.length > 0) {
            return res.json(marcas[0]);
            console.log(marcas);
        }
        res.status(404).json({ text: 'La marca no existe' });

    }

    public async crear(req: Request, res: Response): Promise<void> {
        try {

            const codigomaximo = await pool.query('SELECT MAX(codigo)+1 AS codigo FROM vehiculos');
            JSON.stringify(codigomaximo);
            const codigo = codigomaximo[0].codigo;
            const codigomarca = req.body.marca;
            const codigomodelo = req.body.modelo;
            const codigotransmision = req.body.transmicion;
            const codigotipocombustible = req.body.combustible;
            const codigotraccion = req.body.traccion;
            const codigocolor = req.body.color;
            const codigoanio = req.body.anio;
            const numerochapa = req.body.chapa;
            const numerochasis = req.body.chasis;
            const vehiculos = {
                codigo, codigomarca, codigomodelo, codigotransmision, codigotipocombustible, codigotraccion, codigocolor,
                codigoanio, numerochapa, numerochasis
            };
            const codigocliente = req.body.cliente;
            const codigovehiculo=codigo;
            const detallevehiculo = { codigovehiculo, codigocliente }
            console.log(vehiculos)
            await transaccion.query("SET autocommit=0")
            await transaccion.query('INSERT INTO vehiculos  SET ?', vehiculos);
            await transaccion.query('INSERT INTO detallesvehiculos  SET ?', detallevehiculo);
            await transaccion.query("COMMIT");// se confirma la transaccion
            await transaccion.query("SET autocommit=1")
           // await Promise.all([set0, cabecera, detalle, comi, set1])
            res.json({ message: "el anio fue guardado" });
        } catch (error) {
            await transaccion.query("ROLLBACK");
            await transaccion.query("SET autocommit=1")
           // await Promise.all([rol, set11]);
            console.log('error' + error)
        }
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const marcas = await pool.query('DELETE FROM tracciones WHERE codigo=?', [id]);
        res.json({ message: 'La marca fue eliminado' });
    }

    public async actualizar(req: Request, res: Response): Promise<any> {
        try {
            const codigo = req.body.codigo;
            const nombre = req.body.nombre;
            const categoria = await pool.query('UPDATE tracciones SET ? WHERE codigo = ?', [req.body, codigo]);
            res.json({ message: 'La marca fue actualizada' });
        } catch (error) {
            console.log('error' + error)
        }
    }
}

export const vehiculoControlador = new VehiculoControlador();