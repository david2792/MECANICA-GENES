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
    getTimbrados({ commit }, configuracion) {
        axios
            .get('timbrados', configuracion)
            .then(timbrado => timbrado.data)
            .then(timbrado => {
                commit("SET_TIMBRADO", timbrado);
            });
    },

    insertTimbrado({ commit }, timbrado){
        console.log("recibiendo valores para registrar timbrados: ", timbrado.configuracion);
        axios
        .post('timbrados', {timbrados: timbrado}, timbrado.configuracion)
        .then(function (response) {
            console.log('Hola!!!')
        })
        .catch(function(error) {
            console.log(error);
          });
    }
};