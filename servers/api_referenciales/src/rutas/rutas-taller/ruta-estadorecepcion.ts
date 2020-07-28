import { estadoRecepcionControlador } from '../../controladores/referenciales-taller/estadoRecepcion';
import { Router } from 'express';

class EstadoRecepcionRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',estadoRecepcionControlador.listar);
       this.router.post('/',estadoRecepcionControlador.crear);
       this.router.put('/',estadoRecepcionControlador.actualizar);
   }
}

const estadoRecepcionRutas = new EstadoRecepcionRutas();
 export default estadoRecepcionRutas.router;