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
        Ciudad:"",
        configuracion: [],
        edit: false,
    },
    // dialog: false,
};

export const mutations = {
    SET_PROVEEDOR(state, proveedor){
        console.log(proveedor);
        state.proveedores = proveedor;
    },
    GET_PROVEEDOR(state, value){
        console.log("Muttations: ", value)
        state.Proveedor = value;
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
    },
    getProveedor({commit}, item){
        console.log("Item recibido", item);
        commit("GET_PROVEEDOR", item);
    }
};

export const getters = {
    setProveedor: (state) => {
        console.log(state.Proveedor.CodigoProveedor)
        return state.proveedor;
    }
};