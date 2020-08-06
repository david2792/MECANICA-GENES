import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    timbrados: [],
};

export const mutations = {
    SET_TIMBRADO(state, timbrados) {
        state.timbrados = timbrados;
    },
};

export const actions = {
    getTimbrados({ commit }) {
        axios
            .get('timbrados')
            .then(timbrado => timbrado.data)
            .then(timbrado => {
                commit("SET_TIMBRADO", timbrado);
            });
    },
    
};