<template >
  <v-app id="app">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
      v-if="logueado"
    >
      <v-list dense color="primary">
        <template v-if="esAdministrador">
          <v-list-tile :to="{name:'home'}">
            <v-list-tile-action>
              <v-icon color="black">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Inicio</v-list-tile-title>
          </v-list-tile>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon dark color="black">mdi-wrench</v-icon>Referenciales Productos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'categoria'}">
              <v-list-tile-action>
                <v-icon color="black">info</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Categorías</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'marca'}">
              <v-list-tile-action>
                <v-icon color="black">info</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Marcas</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'medida'}">
              <v-list-tile-action>
                <v-icon color="black">info</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Unidad de Medida</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'impuesto'}">
              <v-list-tile-action>
                <v-icon color="black">info</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Tipo de Impuesto</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon dark color="black">mdi-wrench</v-icon>Referenciales Localidades
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'pais'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Paises</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'departamento'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Departamentos</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'ciudad'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Ciudades</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon dark color="black">mdi-wrench</v-icon>Referenciales Personas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'cliente'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Clientes</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: ''}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Proveedores</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon dark color="black">mdi-file</v-icon>Mantener Stock
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'producto'}">
              <v-list-tile-action>
                <v-icon color="black">info</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Alta Productos</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{}">
              <v-list-tile-action>
                <v-icon color="black">info</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Configuracion</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Accesos</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: ''}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Usuarios</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Consultas</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: ''}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Consulta Compras</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: ''}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Consulta Ventas</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="green" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Mecanica Genes</span>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn> -->
            <v-spacer></v-spacer>
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>logout</v-icon> Salir
      </v-btn>
      <v-btn :to="{name: 'login'}" icon v-else>
        <v-icon>apps</v-icon> Login
      </v-btn>
    </v-toolbar>
    <!-- aqui va el contenido -->
    <v-content  class="d-flex align-start flex-column mb-6 pt-4">
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <!-- termina el contenido -->
    <v-footer dark height="70" >
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="green" height="70" class="white--text">
            <v-card-text class="white--text pt-10">SMART SYSTEMS &copy;2020</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    logueado() {
   return this.$store.state.usuario;
    },
    esAdministrador() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.NivelUsuario == "ADMINISTRADOR"

      );
       
    },
    esAlmacenero() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol == "Almacenero"
      );
    },
    esVendedor() {
      return (
        this.$store.state.usuario && this.$store.state.usuario.NivelUsuario == "Vendedor"
      );
    }
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  methods: {
    salir() {
      this.$store.dispatch("salir");
    }
  }
};
</script>
