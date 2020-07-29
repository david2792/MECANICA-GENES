import { Router } from 'express';
import {controladorCliente} from '../../controladores/clientes/cliente'

class ClientesRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',controladorCliente.listar);
       this.router.post('/',controladorCliente.crear);
       this.router.put('/',controladorCliente.actualizar);
      
   }
}

const clienteRutas = new ClientesRutas();
 export default clienteRutas.router;