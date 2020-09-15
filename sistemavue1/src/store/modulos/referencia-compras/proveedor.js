import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    showModal: false,
    proveedores: []
};

export const mutations = {
    SWITCH_MODAL(state) {
        state.showModal = !state.showModal;
    },
    SET_PROVEEDOR(state, proveedores){
        state.proveedores = proveedores;
    }
};

export const actions = {
    getProveedores({committ}, configuracion){
        console.log(configuracion);
    }
};

export const getters = {
    showModal: state =>{
        return state.showModal;
    }
};