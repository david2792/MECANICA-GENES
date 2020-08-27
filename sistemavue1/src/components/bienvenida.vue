
<template>
    <v-layout align-start justify-center  row wrap >
      <v-flex   xs12 sm12 md12 lg12 xl12 >
        <h1  class="display-3 font-weight-bold mb-3" align="center">BIENVENIDO AL SISTEMA</h1>

        <h1 align="center"><span>{{listar}}</span></h1>
        <div align="center"><v-img :src="require('../assets/genes.jpeg')" class="my-3" max-width="600"  max-height="320"></v-img></div>
      </v-flex>
      <v-flex  xs12 sm12 md2 lg2 xl2>
        <v-card
            class="mx-auto"
            max-width="200"
            max-height="170"
        >
          <v-img
              class="white--text align-end"
              :src="require('../assets/user.png')"
              contain
              height="100"
          ></v-img>
          <v-card-actions>
            <v-btn
                block
                dark
                text
                color="deep-purple accent-4"
                :to="{name: 'cliente'}"
            >
              Agregar Cliente
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex  xs12 sm12 md2 lg2 xl2>
        <v-card
            class="mx-auto"
            max-width="200"
            max-height="170"
        >
          <v-img
              class="white--text align-end"
              :src="require('../assets/mecanica.png')"
              contain
              height="100"
          ></v-img>
          <v-card-actions>
            <v-btn
                block
                dark
                text
                color="deep-purple accent-4"
                :to="{name: 'orden'}"
            >
              Orden de Trabajo
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex  xs12 sm12 md2 lg2 xl2 >
        <v-card
            class="mx-auto "
            max-width="200"
            max-height="170"
        >
          <v-img
              class="white--text align-end"
              :src="require('../assets/auto.png')"
              contain
              height="100"
          ></v-img>
          <v-card-actions>
            <v-btn
                block
                dark
                text
                color="deep-purple accent-4"
                :to="{name: 'recepcion'}"
            >
              Recepcion Vehiculo
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex  xs12 sm12 md2 lg2 xl2 >
        <v-card
            class="mx-auto "
            max-width="200"
            max-height="170"
        >
          <v-img
              class="white--text align-end"
              :src="require('../assets/repuesto.png')"
              contain
              height="100"
          ></v-img>
          <v-card-actions>
            <v-btn
                block
                dark
                text
                color="deep-purple accent-4"
                :to="{name: 'producto'}"
            >

              Repuestos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex  xs12 sm12 md2 lg2 xl2 >
        <v-card
            class="mx-auto "
            max-width="200"
            max-height="170"
        >
          <v-img
              class="white--text align-end"
              :src="require('../assets/vehiculo.png')"
              contain
              height="100"
          ></v-img>
          <v-card-actions>
            <v-btn
                block
                dark
                text
                color="deep-purple accent-4"
                :to="{name: 'vehiculo'}"
            >

              Vehiculos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
<!--     <v-flex xs12 sm12 md12 lg5 xl5>-->
<!--       <v-img-->
<!--           class="white&#45;&#45;text align-light"-->
<!--           :src="require('../assets/usuario.png')"-->
<!--           contain-->
<!--           height="100"-->
<!--       ></v-img>-->
<!--     </v-flex>-->
    </v-layout>

</template>
<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuetifyjs.com"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ],
    colors: [
      "indigo",
      "warning",
      "pink darken-2",
      "red lighten-1",
      "deep-purple accent-4"
    ],
    slides: ["First", "Second", "Third", "Fourth", "Fifth"]
  }),

  computed: {
      listar() {
          let rol =this.$store.state.usuario.users;
         return rol
         // console.log(idproducto)
        },
  },
    methods: {
        // listar() {
        //   let rol =this.$route.params.rol;
        //  return rol
        //  // console.log(idproducto)
        // },
}
}
</script>

<style>
</style>
