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
    //    
        this.router.get('/update/:id',recepcionvehiculoControlador.listarUno);
        this.router.get('/listar/',recepcionvehiculoControlador.listarRecepcion);
        this.router.post('/guardar',recepcionvehiculoControlador.guardar);
        this.router.get('/list/:id',recepcionvehiculoControlador.listar);
        this.router.put('/actualizar',recepcionvehiculoControlador.actualizar);
    }
}

const recepcionVehiculoRuta = new RecepcionVehiculoRuta();
export default recepcionVehiculoRuta.router;