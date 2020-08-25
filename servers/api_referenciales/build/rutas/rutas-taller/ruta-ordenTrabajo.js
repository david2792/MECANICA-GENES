"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ordenTrabajo_1 = require("./../../controladores/referenciales-taller/ordenTrabajo");
const express_1 = require("express");
class OrdenoRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/recepcion', ordenTrabajo_1.ordenControlador.listar);
        this.router.get('/repuesto', ordenTrabajo_1.ordenControlador.listarRepuestos);
        // this.router.get('/',ordenControlador.listarRecepcion);
        this.router.post('/guardar', ordenTrabajo_1.ordenControlador.guardar);
        //    this.router.put('/',traccionesControlador.actualizar);
    }
}
const ordenoRuta = new OrdenoRuta();
exports.default = ordenoRuta.router;
