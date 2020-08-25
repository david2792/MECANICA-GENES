"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class OrdenControlador {
    listarRepuestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield conexionBD_1.default.query('SELECT * FROM vproductos where CodigoProducto>0');
            res.json(productos);
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recepciones = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE estado=1');
            res.json(recepciones);
        });
    }
    listarRecepcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vrecepciones');
            res.json(marcas);
        });
    }
    guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigosucursal = req.body.CodigoSucursal;
                const puntoexpedicion = req.body.PuntoExpedicion;
                const numero = req.body.numero;
                const codigoestadoorden = req.body.codigoestadoorden;
                const observacion = req.body.observacion;
                const fechaemision = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                const horaemision = "00:00:00";
                const fechatentativaentrega = "2020-01-01";
                const horatentativaentrega = "00:00:00";
                const fechafinalizacion = "2020-01-01";
                const horafinalizacion = "00:00:00";
                const fechaentrega = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                const horaentrega = "00:00:00";
                const orden = { codigosucursal, puntoexpedicion, numero, codigoestadoorden, observacion,
                    fechaemision, horaemision, fechatentativaentrega, horatentativaentrega, fechafinalizacion, horafinalizacion, fechaentrega, horaentrega };
                console.log(orden);
                yield transaccionBD_1.default.query("SET autocommit=0");
                yield transaccionBD_1.default.query('INSERT INTO ordenestrabajos  SET ?', orden);
                let detalles = req.body.detalles;
                console.log(detalles);
                for (let i in detalles) {
                    const codigoproducto = detalles[i].codigoproducto;
                    const codigomecanico = detalles[i].codigomecanico;
                    const cantidad = detalles[i].cantidad;
                    const descripcion = detalles[i].descripcion;
                    const precio = detalles[i].precio;
                    const codigoimpuesto = detalles[i].codigoimpuesto;
                    const codigoestadoreparacion = '1';
                    const detalle = { codigosucursal, puntoexpedicion, numero, codigoproducto, codigomecanico, cantidad,
                        descripcion, precio, codigoimpuesto, codigoestadoreparacion };
                    yield transaccionBD_1.default.query('INSERT INTO detallesordentrabajos  SET ?', detalle);
                }
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                res.json({ message: "el orden de trabajo fue guardado" });
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
}
exports.ordenControlador = new OrdenControlador();
