import Vue from 'vue'
import Vuex from 'vuex'
import * as timbrados from '@/store/modulos/referenciales-facturas/timbrado.js'
import * as sucursales from '@/store/modulos/referenciales-facturas/sucursales.js'
import * as tipoDocumento from '@/store/modulos/referenciales-facturas/tipoDocumentos.js'
import * as recepcionvehiculos from '@/store/modulos/informes/informe_recepcion.js'
import * as rordenTrabajo from '@/store/modulos/informes/informe_ordenTrabajo.js'
import * as vProveedor from '@/store/modulos/referencia-compras/proveedor.js'
import * as ciudad from '@/store/modulos/referencia-localidades/ciudad.js'
import * as dialogo from '@/store/modulos/dialogo/dialogo.js'
import * as clientes from '@/store/modulos/referenciales_personas/clientes.js';
import decode from 'jwt-decode'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    timbrados,
    sucursales,
    tipoDocumento,
    recepcionvehiculos,
    rordenTrabajo,
    vProveedor,
    ciudad,
    dialogo,
    clientes,
  },
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },
  actions: {
    guardarToken({commit}, token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        commit("setUsuario", decode(token));
      }
      router.push({name: 'home'});
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({name: 'autoLogin'});
    }
  }
})
