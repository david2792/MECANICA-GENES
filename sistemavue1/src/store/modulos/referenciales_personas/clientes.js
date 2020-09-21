import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    clientes: [],
};

export const mutations = {
    SET_CLIENTES(state, clientes) {
        state.clientes = clientes;
    },
};

export const actions = {
    getClientes({ commit }, configuracion) {
        axios
            .get("clientes/", configuracion)
            .then(result => result.data)
            .then(result => {
                commit('SET_CLIENTES', result);
            });
    }

};