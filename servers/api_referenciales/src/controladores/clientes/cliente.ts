import {Request, Response} from 'express';
import pool from '../../conexionBD';


class ClienteControlador
{
 public async listar (req:Request,res:Response){
    const usuario = await pool.query('SELECT * FROM vclientes');
    res.json(usuario);
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
   const ciudad= req.body.ciudad;
   const id= await pool.query('SELECT codigo FROM ciudades WHERE nombre =?',ciudad);
   JSON.stringify(id);
   const codigociudades= id[0].codigo;
   console.log(codigociudades);
   const Cedula = req.body.Cedula;
   const Ruc = req.body.Ruc;
   const RazonSocial = req.body.RazonSocial;
   //const fechanacimiento = req.body.fechanacimiento;
   const Direccion =  req.body.Direccion;
   const Telefono =  req.body.Telefono;
   const Email= req.body.Email;
   const values={Cedula,Ruc,RazonSocial,Direccion,Telefono,codigociudades};
   await pool.query('INSERT INTO clientes  SET ?',values);
    res.json({message:"el cliente  fue guardado"});
  }
 
  public async actualizar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const ciudad= req.body.ciudad;
   const idciudad= await pool.query('SELECT codigo FROM ciudades WHERE nombre =?',ciudad);
   JSON.stringify(idciudad);
   const codigociudad= idciudad[0].codigo;
   const cedula = req.body.cedula;
   const ruc = req.body.ruc;
   const razonsocial = req.body.razonsocial;
   const fechanacimiento = req.body.fechanacimiento;
   const direccion =  req.body.direccion;
   const telefono =  req.body.telefono;
   const values={cedula,ruc,razonsocial,fechanacimiento,direccion,telefono,codigociudad};
    const marcas =  await pool.query('UPDATE clientes SET ? WHERE codigo = ?',[values,id]);
    res.json({message:'el cliente fue actualizado'});
  }
   public async listarCiudad (req:Request,res:Response){
   
    const ciudad = await pool.query('SELECT nombre FROM ciudades');
    res.json(ciudad); 
  }
  
}
export const controladorCliente =  new ClienteControlador();