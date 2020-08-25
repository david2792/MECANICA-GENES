import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class OrdenControlador {
  public async listarRepuestos(req: Request, res: Response) {
    const productos = await pool.query('SELECT * FROM vproductos where CodigoProducto>0');
    res.json(productos);
  }

    public async listar(req: Request, res: Response):Promise<any>  {
        const recepciones = await pool.query('SELECT * FROM vrecepciones WHERE estado=1');
        res.json(recepciones);
    }

    public async listarRecepcion(req: Request, res: Response) {
      const marcas = await pool.query('SELECT * FROM vrecepciones');
      res.json(marcas);

  }
  
    public async guardar(req: Request, res: Response):Promise<any>  {
      try {

        const codigosucursal=req.body.CodigoSucursal;
        const puntoexpedicion =req.body.PuntoExpedicion;
        const numero = req.body.numero;
        const codigoestadoorden=req.body.codigoestadoorden;
        const observacion=req.body.observacion;
        const fechaemision= new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const horaemision="00:00:00";
        const fechatentativaentrega="2020-01-01";
        const horatentativaentrega="00:00:00";
        const fechafinalizacion="2020-01-01";
        const horafinalizacion="00:00:00";
        const fechaentrega=  new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const horaentrega= "00:00:00";

        const orden={codigosucursal,puntoexpedicion,numero,codigoestadoorden,observacion,
          fechaemision,horaemision,fechatentativaentrega,horatentativaentrega,fechafinalizacion,horafinalizacion,fechaentrega,horaentrega}
      console.log(orden)
      await  transaccion.query("SET autocommit=0")
      await transaccion.query('INSERT INTO ordenestrabajos  SET ?', orden);
        let detalles=req.body.detalles;
          console.log(detalles)
            for (let i in detalles){
              const codigoproducto =detalles[i].codigoproducto
              const codigomecanico =detalles[i].codigomecanico
              const cantidad= detalles[i].cantidad
              const descripcion=detalles[i].descripcion
              const precio = detalles[i].precio
              const codigoimpuesto=detalles[i].codigoimpuesto
              const codigoestadoreparacion = '1'
              const detalle = {codigosucursal,puntoexpedicion,numero,codigoproducto,codigomecanico,cantidad,
                descripcion,precio,codigoimpuesto,codigoestadoreparacion}
              await transaccion.query('INSERT INTO detallesordentrabajos  SET ?', detalle);
          }
         await transaccion.query("COMMIT");// se confirma la transaccion
         await transaccion.query("SET autocommit=1")
         res.json({ message: "el orden de trabajo fue guardado" })
      } catch (error) {
        await transaccion.query("ROLLBACK");
        await transaccion.query("SET autocommit=1")
        console.log("ocurrio un error: " + error);
        throw error
      }
    }   

}

export const ordenControlador = new OrdenControlador();