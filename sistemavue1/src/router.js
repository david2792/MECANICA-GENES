import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store';
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

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/bienvenida',
      name: 'Bienvenida',
      component: bienvenida,
      meta: {
        administrador:true
        }
    },
    // referenciales productos
    {
      path: '/categorias',
      name: 'categoria',
      component: Categoria,
      meta: {
        administrador:true
        }
    },
    {
      path: '/marcas',
      name: 'marca',
      component: Marca,
      meta: {
        administrador:true
        }
    },
      {
        path:'/medidas',
        name: 'medida',
        component: Medida,
        meta: {
        administrador:true
        }
      },
        {
          path:'/impuestos',
          name: 'impuesto',
          component: Impuesto,
          meta: {
            administrador:true
            }
        },
        {
          path:'/productos',
          name:'producto',
          component: Producto,
          meta: {
            administrador:true
            }
        },
        {
          path:'/listaprecio/:id',
          name:'listaprecio',
          component: Listaprecio,
          meta: {
            administrador:true
            }
        },
    // fin de productos
    // cliente
    {
      path:'/clientes',
      name:'cliente',
      component: Cliente,
      meta: {
        administrador:true
        }
    },
    // Localidades
    {
      path:'/paises',
      name:'pais',
      component: Pais,
      meta: {
        administrador:true
        }
    },
    {
      path:'/departamentos',
      name:'departamento',
      component: Departamento,
      meta: {
        administrador:true
        }
    },
    {
      path:'/ciudades',
      name:'ciudad',
      component: Ciudad ,
      meta: {
        administrador:true
        }
    },
    // acceso
    {
      path:'/login',
      name:'Login',
      component: Login,
      meta: {
      libre:true
      }
    },
 
  ]
})
router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.libre)){
    next();
  } else if ( store.state.usuario && store.state.usuario.NivelUsuario == 'ADMINISTRADOR'){
    console.log("estoy aca "+store.state.usuario)
    if (to.matched.some(record => record.meta.administrador)){
      next();
    }
  } else if ( store.state.usuario && store.state.usuario.rol == 'Vendedor'){
    if (to.matched.some(record => record.meta.vendedor)){
      next();
    }
  } else if ( store.state.usuario && store.state.usuario.rol == 'Almacenero'){
    if (to.matched.some(record => record.meta.almacenero)){
      next();
    }
  } else{
    next({name: 'Login'});
  }
})
export default router
