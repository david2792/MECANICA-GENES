import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// const TIMBRADO_URL = "http://127.0.0.1:3030/api/timbrados";

export const state = {
    timbrados: [],
};

export const mutations = {
    SET_TIMBRADO(state, timbrados) {
        console.log("hello it's me")
        state.timbrados = timbrados;
    },
};

export const actions = {
    getTimbrados({ commit }) {
        console.log('Disastreeeeeeee?')
        axios
            .get('timbrados')
            .then(timbrado => timbrado.data)
            .then(timbrado => {
                commit("SET_TIMBRADO", timbrado);
            });
    }
};