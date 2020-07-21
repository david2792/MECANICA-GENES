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
import Cliente from '/components/cliente/Cliente.vue'
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
    // 
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
