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
        this.router.get('/listar',ordenControlador.listarOrden);
        this.router.get('/update/:id',ordenControlador.listarUno);
        this.router.get('/repuesto',ordenControlador.listarRepuestos);
        this.router.put('/entregado',ordenControlador.entregado);
        this.router.post('/guardar',ordenControlador.guardar);
        this.router.post('/insertardetalle',ordenControlador.guardardetalle);
        this.router.put('/eliminar',ordenControlador.eliminarDetalles);
        //    this.router.put('/',traccionesControlador.actualizar);
    
    }
}

const ordenoRuta = new OrdenoRuta();
export default ordenoRuta.router;