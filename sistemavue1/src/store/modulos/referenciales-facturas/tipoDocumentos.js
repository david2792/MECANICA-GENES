import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    tipoDocumentos: [],
};

export const mutations = {
    SET_TIPODOCUMENTOS(state, tipoDocumentos) {
        console.log(tipoDocumentos)
        state.tipoDocumentos = tipoDocumentos;
    },
};

export const actions = {
    getTipoDocumentos({ commit }, configuracion) {
        axios
            .get('tiposDocumentos', configuracion)
            .then(tipoDocumento => tipoDocumento.data)
            .then(tipoDocumento => {
                commit("SET_TIPODOCUMENTOS", tipoDocumento);
            });
    },

    insertTimbrado({ commit }, tipoDocumento){
        console.log("recibiendo valores para registrar timbrados: ", timbrados);
    }
    
};