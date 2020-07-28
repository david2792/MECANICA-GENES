"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nivelCombustible_1 = require("../../controladores/referenciales-taller/nivelCombustible");
const express_1 = require("express");
class TipoCombustibleRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', nivelCombustible_1.nivelesCombustiblesControlador.listar);
        this.router.post('/', nivelCombustible_1.nivelesCombustiblesControlador.crear);
        this.router.put('/', nivelCombustible_1.nivelesCombustiblesControlador.actualizar);
    }
}
const tipoCombustibleRutas = new TipoCombustibleRutas();
exports.default = tipoCombustibleRutas.router;
