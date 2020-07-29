import { Request, Response } from 'express';
import pool from '../../conexionBD';


class ClienteControlador {
  public async listar(req: Request, res: Response) {
    const usuario = await pool.query('SELECT * FROM vclientes');
    res.json(usuario);
  }

  public async crear(req: Request, res: Response): Promise<void> {
    const Codigo = await pool.query('SELECT MAX(CodigoCliente)+1 AS Codigo FROM clientes')
    JSON.stringify(Codigo);
    const CodigoCliente = Codigo[0].Codigo;
    const Ciudad = req.body.Ciudad;
    const id = await pool.query('SELECT CodigoCiudad FROM ciudades WHERE Nombre =?', Ciudad);
    JSON.stringify(id);
    const CodigoCiudad = id[0].CodigoCiudad;
    console.log(CodigoCiudad);
    const Cedula = req.body.Cedula;
    const Ruc = req.body.Ruc;
    const RazonSocial = req.body.RazonSocial;
    const Direccion = req.body.Direccion;
    const Telefono = req.body.Telefono;
    const Email = req.body.Email;
    const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono,Email, CodigoCiudad };
    console.log(values);
    await pool.query('INSERT INTO clientes  SET ?', values);
    res.json({ message: "el cliente  fue guardado" });
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    const CodigoCliente = req.body.CodigoCliente;
    const Ciudad = req.body.Ciudad;
    const idciudad = await pool.query('SELECT CodigoCiudad FROM ciudades WHERE Nombre =?', Ciudad);
    JSON.stringify(idciudad);
    const CodigoCiudad = idciudad[0].CodigoCiudad;
    const Cedula = req.body.Cedula;
    const Ruc = req.body.Ruc;
    const RazonSocial = req.body.RazonSocial;
    const Direccion = req.body.Direccion;
    const Telefono = req.body.Telefono;
    const Email = req.body.Email;
    const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono, Email, CodigoCiudad };
    console.log(values)
    const marcas = await pool.query('UPDATE clientes SET ? WHERE CodigoCliente = ?', [values, CodigoCliente]);
    res.json({ message: 'el cliente fue actualizado' });
  }
  public async listarCiudad(req: Request, res: Response) {

    const ciudad = await pool.query('SELECT nombre FROM ciudades');
    res.json(ciudad);
  }

}
export const controladorCliente = new ClienteControlador();