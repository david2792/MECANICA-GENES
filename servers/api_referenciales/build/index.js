"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// inidex rutas
const indexRutas_1 = __importDefault(require("./rutas/indexRutas"));
// referenciales productos
const ruta_presentacion_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_presentacion"));
const ruta_categoria_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_categoria"));
const ruta_unidadMedida_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_unidadMedida"));
const ruta_impuesto_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_impuesto"));
const ruta_marca_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_marca"));
const ruta_producto_1 = __importDefault(require("./rutas/rutas-producto/ruta_producto"));
const ruta_lista_1 = __importDefault(require("./rutas/rutas-producto/ruta_lista"));
const ruta_cliente_1 = __importDefault(require("./rutas/rutas-clientes/ruta_cliente"));
const ruta_ciudad_1 = __importDefault(require("./rutas/rutas-localidades/ruta_ciudad"));
const ruta_departamento_1 = __importDefault(require("./rutas/rutas-localidades/ruta_departamento"));
const ruta_pais_1 = __importDefault(require("./rutas/rutas-localidades/ruta_pais"));
const ruta_usuario_1 = __importDefault(require("./rutas/rutas-acceso/ruta_usuario"));
// fin referenciales productos
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.rutas();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    rutas() {
        //instanciamos el index de rutas
        this.app.use(indexRutas_1.default);
        // instanciamos las rutas de referenciales
        this.app.use('/api/depositos', ruta_presentacion_1.default);
        this.app.use('/api/marcas', ruta_marca_1.default);
        this.app.use('/api/unidades', ruta_unidadMedida_1.default);
        this.app.use('/api/impuestos', ruta_impuesto_1.default);
        //this.app.use('/api/familias',familiaRutas);
        this.app.use('/api/categorias', ruta_categoria_1.default);
        this.app.use('/api/productos', ruta_producto_1.default);
        this.app.use('/api/listasprecios', ruta_lista_1.default);
        this.app.use('/api/clientes', ruta_cliente_1.default);
        // referenciales localidades
        this.app.use('/api/ciudades', ruta_ciudad_1.default);
        this.app.use('/api/departamentos', ruta_departamento_1.default);
        this.app.use('/api/paises', ruta_pais_1.default);
        // fin de referenciales
        // ruta de acceso
        this.app.use('/api/usuario', ruta_usuario_1.default);
    }
    iniciar() {
        this.app.listen(this.app.get('port'), () => {
            console.log("se inicio el servidor");
        });
    }
}
const servidor = new Server();
servidor.iniciar();
