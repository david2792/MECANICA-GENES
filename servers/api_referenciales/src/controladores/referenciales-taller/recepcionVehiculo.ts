import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class RecepcionVehiculoControlador {
    public async listar(req: Request, res: Response):Promise<any>  {
        const { id } = req.params;
        const CodigoCliente=req.body.cliente;
        console.log(CodigoCliente)
        const marcas = await pool.query('SELECT * FROM vclientevehiculos WHERE CodigoCliente=?',id);
        res.json(marcas);

    }

    public async listarRecepcion(req: Request, res: Response) {
      const marcas = await pool.query('SELECT * FROM vrecepciones');
      res.json(marcas);

  }
  
    public async guardar(req: Request, res: Response):Promise<any>  {
      try {
        const codigosucursal=req.body.CodigoSucursal;
        const puntoexpedicion =req.body.PuntoExpedicion;
        const numero = '1';
        const CodigoCliente=req.body.codigocliente;
        const recibidopor=req.body.recibidopor;
        const estado=req.body.estado;
        const fechaentrada= "2020-08-12";
        const horaentrada= "00:00:00";
        const observaciones=req.body.observaciones;
        const recepciones={codigosucursal,puntoexpedicion,numero,CodigoCliente,recibidopor,estado,fechaentrada,
      horaentrada,observaciones}
      console.log(recepciones)
      await  transaccion.query("SET autocommit=0")
      await transaccion.query('INSERT INTO recepciones  SET ?', recepciones);
        let detalles=req.body.detalles;
          console.log(detalles)
            for (let i in detalles){
              const codigonivelcombustible =detalles[i].codigonivel
              const codigovehiculos= detalles[i].Codigo 
              const km = detalles[i].km
              const detalle = {codigosucursal,puntoexpedicion,numero,codigovehiculos,codigonivelcombustible,km}
              await transaccion.query('INSERT INTO detallesrecepciones  SET ?', detalle);
          }
         await transaccion.query("COMMIT");// se confirma la transaccion
         await transaccion.query("SET autocommit=1")
         res.json({ message: "el producto fue guardado" })
      } catch (error) {
        await transaccion.query("ROLLBACK");
        await transaccion.query("SET autocommit=1")
        console.log("ocurrio un error: " + error);
        throw error
      }
    }   

}

export const recepcionvehiculoControlador = new RecepcionVehiculoControlador();