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
exports.controladorCliente = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class ClienteControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield conexionBD_1.default.query('SELECT * FROM vclientes');
            res.json(usuario);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciudad = req.body.ciudad;
            const id = yield conexionBD_1.default.query('SELECT codigo FROM ciudades WHERE nombre =?', ciudad);
            JSON.stringify(id);
            const codigociudades = id[0].codigo;
            console.log(codigociudades);
            const Cedula = req.body.Cedula;
            const Ruc = req.body.Ruc;
            const RazonSocial = req.body.RazonSocial;
            //const fechanacimiento = req.body.fechanacimiento;
            const Direccion = req.body.Direccion;
            const Telefono = req.body.Telefono;
            const Email = req.body.Email;
            const values = { Cedula, Ruc, RazonSocial, Direccion, Telefono, codigociudades };
            yield conexionBD_1.default.query('INSERT INTO clientes  SET ?', values);
            res.json({ message: "el cliente  fue guardado" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ciudad = req.body.ciudad;
            const idciudad = yield conexionBD_1.default.query('SELECT codigo FROM ciudades WHERE nombre =?', ciudad);
            JSON.stringify(idciudad);
            const codigociudad = idciudad[0].codigo;
            const cedula = req.body.cedula;
            const ruc = req.body.ruc;
            const razonsocial = req.body.razonsocial;
            const fechanacimiento = req.body.fechanacimiento;
            const direccion = req.body.direccion;
            const telefono = req.body.telefono;
            const values = { cedula, ruc, razonsocial, fechanacimiento, direccion, telefono, codigociudad };
            const marcas = yield conexionBD_1.default.query('UPDATE clientes SET ? WHERE codigo = ?', [values, id]);
            res.json({ message: 'el cliente fue actualizado' });
        });
    }
    listarCiudad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciudad = yield conexionBD_1.default.query('SELECT nombre FROM ciudades');
            res.json(ciudad);
        });
    }
}
exports.controladorCliente = new ClienteControlador();
