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
import Timbrado from './components/timbrado/timbrado.vue'
// TALLER
import EstadoRecepcion from './components/referenciales-taller/EstadoRecepcion.vue'
import NivelCombustible from './components/referenciales-taller/NivelCombustible.vue'
import EstadoReparacion from './components/referenciales-taller/EstadoReparacion.vue'
import Anio from './components/referenciales-taller/Anio.vue'
import Color from './components/referenciales-taller/Color.vue'
import EstadoTrabajo from './components/referenciales-taller/EstadoTrabajo.vue'
import EstadoTransmicion from './components/referenciales-taller/EstadoTransmicion.vue'
import MarcaVehiculo from './components/referenciales-taller/MarcaVehiculo.vue'
import ModeloVehiculo from './components/referenciales-taller/ModeloVehiculo.vue'
import TipoCombustible from './components/referenciales-taller/TipoCombustible.vue'
import Traccion from './components/referenciales-taller/Traccion.vue'
// ADM TALLER
import registrarVehiculo from './components/adm-taller/registrarVehiculo.vue'
import RecepcionVehiculo from "./components/adm-taller/RecepcionVehiculo.vue";
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
    // referenciales taller
    {
      path:'/estadorecepciones',
      name:'estadorecepcion',
      component:EstadoRecepcion,
      meta:{
        administrador:true
      }
    },
    {
      path:'/nivelcombustibles',
      name:'nivelcombustible',
      component:NivelCombustible,
      meta:{
        administrador:true
      }
    },
    {
      path:'/estadoreparaciones',
      name:'estadoreparacion',
      component:EstadoReparacion,
      meta:{
        administrador:true
      }
    },
    {
      path:'/anios',
      name:'anio',
      component:Anio,
      meta:{
        administrador:true
      }
    },
    {
      path:'/colores',
      name:'color',
      component:Color,
      meta:{
        administrador:true
      }
    },
    {
      path:'/estadotrabajos',
      name:'estadotrabajo',
      component:EstadoTrabajo,
      meta:{
        administrador:true
      }
    },
    {
      path:'/estadotransmiciones',
      name:'estadotransmicion',
      component:EstadoTransmicion,
      meta:{
        administrador:true
      }
    },
    {
      path:'/marcavehiculos',
      name:'marcavehiculo',
      component:MarcaVehiculo,
      meta:{
        administrador:true
      }
    },
    {
      path:'/modelovehiculos',
      name:'modelovehiculo',
      component:ModeloVehiculo,
      meta:{
        administrador:true
      }
    },
    {
      path:'/tipocombustibles',
      name:'tipocombustible',
      component:TipoCombustible,
      meta:{
        administrador:true
      }
    },
    {
      path:'/tracciones',
      name:'traccion',
      component:Traccion,
      meta:{
        administrador:true
      }
    },
// ADM Taller
    {
      path:'/vehiculos',
      name:'vehiculo',
      component:registrarVehiculo,
      meta:{
        administrador:true
      }
    },
     {
      path:'/recepciones',
      name:'recepcion',
      component:RecepcionVehiculo,
      meta:{
        administrador:true
      }
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

    // referenciales Factura
    {
      path: '/timbrados',
      name: 'Timbrado',
      component: Timbrado
    },
 
  ]
})
router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.libre)){
    next();
  } else if ( store.state.usuario && store.state.usuario.NivelUsuario == 'ADMINISTRADOR'){
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
