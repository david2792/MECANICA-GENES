"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_1 = require("../../controladores/referencial-compras/proveedor");
class ProveedorRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', proveedor_1.proveedorControlador.listarProveedores);
        // this.router.post('/',proveedorControlador.crear);
        // this.router.put('/',proveedorControlador.actualizar);
    }
}
const proveedorRutas = new ProveedorRutas();
exports.default = proveedorRutas.router;
