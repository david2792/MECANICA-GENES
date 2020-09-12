import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    sucursales: [],
};
export const mutations = {
    SET_SUCURSAL(state, sucursales) {
        console.log('Here', sucursales)
        state.sucursales = sucursales;
    },
};

export const actions = {
    getSucursales({ commit }, configuracion) {
        axios
            .get('sucursales', configuracion)
            .then(sucursal => sucursal.data)
            .then(sucursal => {
                commit("SET_SUCURSAL", sucursal);
            });
    },
    
};
