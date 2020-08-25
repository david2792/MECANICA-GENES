import { ordenControlador } from './../../controladores/referenciales-taller/ordenTrabajo';
import { Router } from 'express';

class OrdenoRuta
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.get('/recepcion',ordenControlador.listar);
        this.router.get('/repuesto',ordenControlador.listarRepuestos);
        // this.router.get('/',ordenControlador.listarRecepcion);
        this.router.post('/guardar',ordenControlador.guardar);
        //    this.router.put('/',traccionesControlador.actualizar);
    
    }
}

const ordenoRuta = new OrdenoRuta();
export default ordenoRuta.router;