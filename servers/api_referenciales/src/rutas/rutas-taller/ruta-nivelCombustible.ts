import { nivelesCombustiblesControlador } from '../../controladores/referenciales-taller/nivelCombustible';
import { Router } from 'express';

class TipoCombustibleRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',nivelesCombustiblesControlador.listar);
       this.router.post('/',nivelesCombustiblesControlador.crear);
       this.router.put('/',nivelesCombustiblesControlador.actualizar);
   }
}

const tipoCombustibleRutas = new TipoCombustibleRutas();
 export default tipoCombustibleRutas.router;