import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    rvehiculos: [],
    filtrar_rvehiculos: [],
    filtar_fecha: [],
    numerochapa: "",
    fechaDesde: new Date().toISOString().substr(0, 10),
    fechaHasta: new Date().toISOString().substr(0, 10)
};

export const mutations = {
    SET_RVEHICULO(state, vehiculo) {
        state.rvehiculos = vehiculo;
    },
    SET_RVEHICULO_DATOS(state, filtrar_rvehiculos) {
        state.filtrar_rvehiculos = filtrar_rvehiculos;
    },
    SET_RVEHICULO_FECHA(state, filtar_fecha) {
        state.filtar_fecha = filtar_fecha;
    },
};

export const actions = {
    getrvehiculos({ commit }, configuracion) {
        axios
            .get('rvehiculo', configuracion)
            .then(rvehiculo => rvehiculo.data)
            .then(rvehiculo => {
                commit("SET_RVEHICULO", rvehiculo);
                // commit("SET_RVEHICULO_FECHA", rvehiculo);
            });
    },

    getrvehiculosPorFecha({commit}, configuracion){
        console.log(state.fechaDesde, state.fechaHasta, state.numerochapa);
        axios
            .post('rvehiculo/recepcionFecha', {fechadesde: state.fechaDesde, fechaHasta:state.fechaHasta}, configuracion)
            .then(rvehiculo => rvehiculo.data)
            .then(rvehiculo =>{
                console.log("datos filtrados fecha:",rvehiculo);
                commit("SET_RVEHICULO_FECHA", rvehiculo);
            })
    },

    filtrar_Datos({commit}, configuracion){
        console.log(state.fechaDesde, state.fechaHasta, state.numerochapa);
        axios
            .post('rvehiculo/recepcionFecha', {fechadesde: state.fechaDesde, fechaHasta:state.fechaHasta, chapa: state.numerochapa}, configuracion)
            .then(filtar_fecha => filtar_fecha.data)
            .then(filtar_fecha =>{
                console.log("datos filtrados:",filtar_fecha);
                commit("SET_RVEHICULO_DATOS", filtar_fecha);
            })
    }
    
};
export const getters={
    recepcion_datos: state => {
        console.log("Getters datos: ", state.filtrar_rvehiculos)
        return state.filtrar_rvehiculos;
    },
    recepcion_por_fecha: state => {
        console.log("getters fecha: ", state.filtar_fecha)
        return state.filtar_fecha;
    }
};