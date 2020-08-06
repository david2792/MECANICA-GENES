import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
// inidex rutas
import indexRutas from './rutas/indexRutas'
// referenciales productos
import presentacionesRutas from './rutas/rutas-referenciales/ruta_presentacion';
import categoriaRutas from './rutas/rutas-referenciales/ruta_categoria';
import familiaRutas from './rutas/rutas-referenciales/ruta_familia';
import medidasRutas from './rutas/rutas-referenciales/ruta_unidadMedida';
import impuestosRutas from './rutas/rutas-referenciales/ruta_impuesto';
import marcasRutas from './rutas/rutas-referenciales/ruta_marca';
import productosRutas from './rutas/rutas-producto/ruta_producto';
import listaRutas from './rutas/rutas-producto/ruta_lista';

// referenciales factura

import timbradosRutas from './rutas/rutas-referenciales-factura/ruta_timbrado';

// fin referenciales productos

class Server
{
   public app: Application;
    constructor()
    {
       this.app = express();
       this.config();
       this.rutas();
    }
    config():void
    {
        this.app.set('port',process.env.PORT||3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    rutas():void
    {
        //instanciamos el index de rutas
        this.app.use(indexRutas);
        // instanciamos las rutas de referenciales
        this.app.use('/api/depositos',presentacionesRutas);
        this.app.use('/api/marcas',marcasRutas);
        this.app.use('/api/unidades',medidasRutas);
        this.app.use('/api/impuestos',impuestosRutas);
        //this.app.use('/api/familias',familiaRutas);
        this.app.use('/api/categorias',categoriaRutas);
        this.app.use('/api/productos',productosRutas);
        this.app.use('/api/listasprecios',listaRutas);
        // fin de referenciales
        //referenciales rutas
        this.app.use('/api/timbrados', timbradosRutas);
    }
    iniciar():void
    {
        this.app.listen(this.app.get('port'),()=>{
            console.log("se inicio el servidor")
        });
    }
}
const servidor =  new Server();
servidor.iniciar();