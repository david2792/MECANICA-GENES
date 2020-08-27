import { recepcionvehiculoControlador } from './../../controladores/referenciales-taller/recepcionVehiculo';
import { Router } from 'express';

class RecepcionVehiculoRuta
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.get('/:id',recepcionvehiculoControlador.listar);
        this.router.get('/update/:id',recepcionvehiculoControlador.listarUno);
        this.router.get('/',recepcionvehiculoControlador.listarRecepcion);
        this.router.post('/',recepcionvehiculoControlador.guardar);
        //    this.router.put('/',traccionesControlador.actualizar);
    }
}

const recepcionVehiculoRuta = new RecepcionVehiculoRuta();
export default recepcionVehiculoRuta.router;