import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    rOrdenTrabajos: [],
    ordenTrabajoClienteFecha:[],
    fechaDesde: new Date().toISOString().substr(0, 10),
    fechaHasta: new Date().toISOString().substr(0, 10),
    filtrar_rvehiculos: [],
    filtar_fecha: [],
};

export const mutations = {
    SET_RORDENTRABAJO(state, rOrdenTrabajo) {
        console.log(rOrdenTrabajo)
        state.rOrdenTrabajos = rOrdenTrabajo;
    },

    SET_RORDENTRABAJO_PORCLIENTE(state, ordenTrabajo) {
        state.ordenTrabajoPorCliente = ordenTrabajo;
    },

    SET_ORDEN_VEHICULO_DATOS(state, filtrar_rvehiculos) {
        state.filtrar_rvehiculos = filtrar_rvehiculos;
    },
    SET_ORDEN_VEHICULO_FECHA(state, filtar_fecha) {
        state.filtar_fecha = filtar_fecha;
    },
};

export const actions = {
    getrvordenTrabajo({ commit }, configuracion) {
        axios
            .get('orden/listarOrdenConf/', configuracion)
            .then(rOrdenTrabajo => rOrdenTrabajo.data)
            .then(rOrdenTrabajo => {
                commit("SET_RORDENTRABAJO", rOrdenTrabajo);
            });
    },

    getrecepcionvehiculosPorFecha({commit}, configuracion){
        console.log(state.fechaDesde, state.fechaHasta, state.numerochapa);
        axios
            .post('orden/filtrarvordentrabajos', {fechadesde: state.fechaDesde, fechaHasta:state.fechaHasta}, configuracion)
            .then(rvehiculo => rvehiculo.data)
            .then(rvehiculo =>{
                console.log("datos filtrados fecha:",rvehiculo);
                commit("SET_ORDEN_VEHICULO_FECHA", rvehiculo);
            })
    },

    filtrar_recepcion_Datos({commit}, configuracion){
        console.log(state.fechaDesde, state.fechaHasta, state.numerochapa);
        axios
            .post('orden/filtrarvordentrabajos', {fechadesde: state.fechaDesde, fechaHasta:state.fechaHasta, chapa: state.numerochapa}, configuracion)
            .then(filtar_fecha => filtar_fecha.data)
            .then(filtar_fecha =>{
                console.log("datos filtrados:",filtar_fecha);
                commit("SET_ORDEN_VEHICULO_DATOS", filtar_fecha);
            })
    }
    
};

export const getters={
};