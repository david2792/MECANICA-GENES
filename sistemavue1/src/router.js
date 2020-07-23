import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import bienvenida from './components/bienvenida.vue'
import Categoria from './components/referenciales-productos/Categoria.vue'
import Marca from './components/referenciales-productos/Marca.vue'
import Medida from './components/referenciales-productos/Medida.vue'
import Impuesto from './components/referenciales-productos/Impuesto.vue'
import Producto from './components/producto/Producto.vue'
import Listaprecio from './components/producto/Listaprecio.vue'
import Cliente from './components/referenciales-personas/Cliente.vue'
import Pais from './components/referenciales-localidades/Pais.vue'
import Departamento from './components/referenciales-localidades/Departamento.vue'
import Ciudad from './components/referenciales-localidades/Ciudad.vue'

import Login from './components/acceso/Login.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'bienvenida',
      component: bienvenida
    },
    // referenciales productos
    {
      path: '/categorias',
      name: 'categoria',
      component: Categoria
    },
    {
      path: '/marcas',
      name: 'marca',
      component: Marca
    },
      {
        path:'/medidas',
        name: 'medida',
        component: Medida
      },
        {
          path:'/impuestos',
          name: 'impuesto',
          component: Impuesto
        },
        {
          path:'/productos',
          name:'producto',
          component: Producto
        },
        {
          path:'/listaprecio/:id',
          name:'listaprecio',
          component: Listaprecio
        },
    // fin de productos
    // cliente
    {
      path:'/clientes',
      name:'cliente',
      component: Cliente
    },
    // Localidades
    {
      path:'/paises',
      name:'pais',
      component: Pais
    },
    {
      path:'/departamentos',
      name:'departamento',
      component: Departamento
    },
    {
      path:'/ciudades',
      name:'ciudad',
      component: Ciudad
    },
    // acceso
    {
      path:'/login',
      name:'Login',
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
 
  ]
})
