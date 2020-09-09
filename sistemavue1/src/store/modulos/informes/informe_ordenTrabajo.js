import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    rOrdenTrabajos: [],
};

export const mutations = {
    SET_RORDENTRABAJO(state, rOrdenTrabajo) {
        console.log(rOrdenTrabajo)
        state.rOrdenTrabajos = rOrdenTrabajo;
    },
};

export const actions = {
    getrvordenTrabajo({ commit }, configuracion) {
        axios
            .get('orden/listar/', configuracion)
            .then(rOrdenTrabajo => rOrdenTrabajo.data)
            .then(rOrdenTrabajo => {
                commit("SET_RORDENTRABAJO", rOrdenTrabajo);
            });
    },
    
};

export const getters={
    ordenTrabajoPorFecha(state, fechaInicio, fechaFin){
        return state.rOrdenTrabajos.filter(ordenTrabajo =>{
            return (ordenTrabajo.fechaentrada >= fechaInicio && fechaentrada <= fechaFin);
        });
    }
};