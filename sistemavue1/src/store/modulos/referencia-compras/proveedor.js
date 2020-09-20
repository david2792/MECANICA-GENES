import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    proveedores: [],
    Proveedor: {
        CodigoProveedor: "",
        RazonSocial: "",
        Cedula: "",
        Ruc: "",
        Direccion: "",
        Telefono: "",
        Email: "",
        Web: "",
        CodigoCiudad: "",
        Ciudad: "",
        configuracion: [],
    },
    editar_item: false,
};

export const mutations = {
    SET_PROVEEDOR(state, proveedor) {
        console.log(proveedor);
        state.proveedores = proveedor;
    },
    GET_PROVEEDOR(state, value) {
        console.log("Muttations: ", value)
        state.Proveedor = value;
    }
};

export const actions = {
    getProveedores({ commit }, configuracion) {
        console.log(configuracion);
        axios
            .get('proveedores', configuracion)
            .then(proveedor => proveedor.data)
            .then(proveedor => {
                commit("SET_PROVEEDOR", proveedor);
            });
    },
    getProveedor({ commit }, item) {
        console.log("Item recibido", item);
        commit("GET_PROVEEDOR", item);
    },

    guardarProveedor({ commit }, configuracion) {
        let setProveedor = state.Proveedor;
        if (!state.editar_item) {
            axios
                .post('proveedores', { proveedores: setProveedor }, configuracion)
                .then(result =>{
                    commit("SET_PROVEEDOR", result.data)
                }).catch(error=>{
                    console.log("Error: "+error);
                });
        } else {
            axios
                .put('proveedores', { proveedores: setProveedor }, configuracion)
                .then(result =>{
                    commit("SET_PROVEEDOR", result.data);
                }).catch(error=>{
                    console.log("Error: "+error);
                });
            console.log("Editar", state.Proveedor);
            state.editar_item = !state.editar_item;
        }
    },
};

export const getters = {
    setProveedor: (state) => {
        return state.proveedor;
    }
};