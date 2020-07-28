
import express, { Application } from 'express';
import morgan, { token } from 'morgan';
import cors from 'cors';
import {TokenValidation}  from './libs/validateToken'

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
import clienteRutas from './rutas/rutas-clientes/ruta_cliente';
import ciudadRutas from './rutas/rutas-localidades/ruta_ciudad';
import departamentoRutas from './rutas/rutas-localidades/ruta_departamento';
import paisesRutas from './rutas/rutas-localidades/ruta_pais';
import usuarioRutas from './rutas/rutas-acceso/ruta_usuario';

// fin referenciales productos
class Server {

    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.rutas();
    }
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
       
    }
    rutas(): void {
        //instanciamos el index de rutas
        this.app.use(indexRutas);
        // instanciamos las rutas de referenciales
        this.app.use('/api/depositos', TokenValidation,presentacionesRutas);
        this.app.use('/api/marcas' ,TokenValidation,marcasRutas);
        this.app.use('/api/unidades', TokenValidation,medidasRutas);
        this.app.use('/api/impuestos', TokenValidation,impuestosRutas);
        //this.app.use('/api/familias',familiaRutas);
        this.app.use('/api/categorias', TokenValidation,categoriaRutas);
        this.app.use('/api/productos', TokenValidation,productosRutas);
        this.app.use('/api/listasprecios',TokenValidation ,listaRutas);
        this.app.use('/api/clientes', TokenValidation,clienteRutas);
        // referenciales localidades
        this.app.use('/api/ciudades',TokenValidation,ciudadRutas);
        this.app.use('/api/departamentos',TokenValidation, departamentoRutas);
        this.app.use('/api/paises',TokenValidation, paisesRutas);
        // fin de referenciales
        // ruta de acceso
        this.app.use('/api/usuario',usuarioRutas)
    }

    iniciar(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("se inicio el servidor")
        });
    }
}
const servidor = new Server();
servidor.iniciar();