import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    rvehiculos: [],
};

export const mutations = {
    SET_RVEHICULO(state, vehiculo) {
        state.rvehiculos = vehiculo;
    },
};

export const actions = {
    getrvehiculos({ commit }, configuracion) {
        axios
            .get('rvehiculo', configuracion)
            .then(rvehiculo => rvehiculo.data)
            .then(rvehiculo => {
                commit("SET_RVEHICULO", rvehiculo);
            });
    },
    
};