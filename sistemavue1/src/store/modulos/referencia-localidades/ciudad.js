import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Ciudades: []
};

export const mutations = {
    SET_CIUDAD(state, Ciudades){
        console.log(Ciudades);
        state.Ciudades = Ciudades;
    }
};

export const actions = {
    getCiudades({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('ciudades', configuracion)
            .then(ciudad => ciudad.data)
            .then(ciudad => {
                commit("SET_CIUDAD", ciudad);
            });
    }
};

export const getters = {
};