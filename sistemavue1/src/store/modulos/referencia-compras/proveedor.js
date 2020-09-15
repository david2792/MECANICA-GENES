import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    proveedores: []
};

export const mutations = {
    SET_PROVEEDOR(state, proveedor){
        console.log(proveedor);
        state.proveedores = proveedor;
    }
};

export const actions = {
    getProveedores({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('proveedores', configuracion)
            .then(proveedor => proveedor.data)
            .then(proveedor => {
                commit("SET_PROVEEDOR", proveedor);
            });
    }
};

export const getters = {
};