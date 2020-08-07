import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    vehiculos: [],
};

export const mutations = {
    SET_TIMBRADO(state, timbrados) {
        state.vehiculos = vehiculos;
    },
};

export const actions = {
    getvehiculos({ commit }) {
        axios
            .get('timbrados')
            .then(timbrado => vehiculos.data)
            .then(timbrado => {
                commit("SET_VEHICULO", vehiculos);
            });
    },
    
};