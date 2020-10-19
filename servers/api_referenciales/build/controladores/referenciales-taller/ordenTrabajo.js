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
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('SELECT * FROM veditaroden WHERE numero=?', id);
            console.log(marcas);
            res.json(marcas);
        });
    }
    entregado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numero = req.body.numero;
                const codigoestadoorden = 2;
                const values = { numero };
                console.log(numero);
                const lista = yield conexionBD_1.default.query('UPDATE ordenestrabajos SET codigoestadoorden=? WHERE numero=?', [codigoestadoorden, numero]);
                yield transaccionBD_1.default.query('UPDATE recepciones SET estado=? WHERE numero=?', ["2", numero]);
                res.json(lista);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recepciones = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE estado=1');
            res.json(recepciones);
        });
    }
    listarOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recepciones = yield conexionBD_1.default.query('SELECT * FROM vordentrabajo WHERE codigoestadoorden=1');
            res.json(recepciones);
        });
    }
    listarRecepcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vordentrabajo');
            res.json(marcas);
        });
    }
    eliminarDetalles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigoproducto = req.body.codigoproducto;
                const cantidad = req.body.cantidad;
                const numero = req.body.codigorecepcion;
                console.log(codigoproducto);
                yield transaccionBD_1.default.query("SET autocommit=0");
                const consulta = yield transaccionBD_1.default.query('SELECT StockActual FROM stock WHERE CodigoProducto=?', [codigoproducto]);
                const stockanterior = consulta[0].StockActual;
                console.log(stockanterior);
                console.log(cantidad);
                const stockactual = stockanterior + cantidad;
                yield transaccionBD_1.default.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?', [stockactual, codigoproducto]);
                yield transaccionBD_1.default.query('DELETE FROM detallesordentrabajos WHERE  numero=?  AND CodigoProducto=?', [numero, codigoproducto]);
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                res.json({ message: "el detalle orden de trabajo fue eliminado" });
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
    actualizar(req, res) {
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
                yield transaccionBD_1.default.query('DELETE FROM detallesordentrabajos INTO ordenestrabajos  SET ?', orden);
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
                    const consulta = yield transaccionBD_1.default.query('SELECT StockActual FROM stock WHERE CodigoProducto=?', [codigoproducto]);
                    const stockanterior = consulta[0].StockActual;
                    console.log(stockanterior);
                    const stockactual = stockanterior - cantidad;
                    yield transaccionBD_1.default.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?', [stockactual, codigoproducto]);
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
                    const consulta = yield transaccionBD_1.default.query('SELECT StockActual FROM stock WHERE CodigoProducto=?', [codigoproducto]);
                    const stockanterior = consulta[0].StockActual;
                    console.log(stockanterior);
                    const stockactual = stockanterior - cantidad;
                    yield transaccionBD_1.default.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?', [stockactual, codigoproducto]);
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
    guardardetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transaccionBD_1.default.query("SET autocommit=0");
                //   await transaccion.query('INSERT INTO ordenestrabajos  SET ?', orden);
                const codigosucursal = req.body.CodigoSucursal;
                const puntoexpedicion = req.body.PuntoExpedicion;
                const numero = req.body.numero;
                const codigoproducto = req.body.codigoproducto;
                const codigomecanico = req.body.codigomecanico;
                const cantidad = req.body.cantidad;
                const descripcion = req.body.descripcion;
                const precio = req.body.precio;
                const codigoimpuesto = req.body.codigoimpuesto;
                const codigoestadoreparacion = '1';
                const detalle = { codigosucursal, puntoexpedicion, numero, codigoproducto, codigomecanico, cantidad,
                    descripcion, precio, codigoimpuesto, codigoestadoreparacion };
                yield transaccionBD_1.default.query('INSERT INTO detallesordentrabajos  SET ?', detalle);
                const consulta = yield transaccionBD_1.default.query('SELECT StockActual FROM stock WHERE CodigoProducto=?', [codigoproducto]);
                const stockanterior = consulta[0].StockActual;
                console.log(stockanterior);
                const stockactual = stockanterior - cantidad;
                yield transaccionBD_1.default.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?', [stockactual, codigoproducto]);
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
    ordenPorFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Recibido backend: ", req.body);
            const fechaentrada = req.body.fechadesde;
            const fechaemision = req.body.fechaHasta;
            const numerochapa = req.body.chapa;
            if (numerochapa) {
                console.log("Filtrar datos_chapa_fecha");
                const orden_Chapa_fecha = yield conexionBD_1.default.query('SELECT * FROM vordentrabajo WHERE numerochapa=? AND fechaentrada  BETWEEN ? AND ?', [numerochapa, fechaentrada, fechaemision]);
                res.json(orden_Chapa_fecha);
            }
            else {
                console.log("Filtrar datos por fecha");
                const orden_recepcionFecha = yield conexionBD_1.default.query('SELECT * FROM vordentrabajo WHERE fechaentrada  BETWEEN ? AND ?', [fechaentrada, fechaemision]);
                res.json(orden_recepcionFecha);
            }
        });
    }
}
exports.ordenControlador = new OrdenControlador();
