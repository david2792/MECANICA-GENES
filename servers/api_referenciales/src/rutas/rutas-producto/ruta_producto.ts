import { Router } from 'express';
import {productoControlador} from '../../controladores/productos/producto';

class ProductosRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar',productoControlador.listar);
       this.router.get('/codigo',productoControlador.recuperarCodigo);
      //  this.router.get('/]',productoControlador.listarCategoria);
      //  this.router.get('/]',productoControlador.listarMarcas);
      //  this.router.get('/]',productoControlador.listarDeposito);
      //  this.router.get('/unidades',productoControlador.listarMedida);
      //  this.router.get('/presentacion',productoControlador.listarPresentacion);
      //  this.router.get('/impuesto',productoControlador.listarImpuesto);
      //  this.router.get('/:id',productoControlador.listarUno);
       this.router.post('/add',productoControlador.crear);
     //  this.router.delete('/:id',categoriaControlador.eliminar);
       this.router.put('/update',productoControlador.actualizar);
      
   }
}

const productosRutas = new ProductosRutas();
 export default productosRutas.router;