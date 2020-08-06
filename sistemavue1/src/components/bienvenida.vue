
<template>
  <!-- <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="2"
      >
        <div
          class="pa-6 text-center grey lighten-2 rounded-0"
          v-text="`.rounded-0`"
        ></div>
      </v-col>
    </v-row>
  </v-container> -->

  <v-container fluid grid-list-xl>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/genes.jpeg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Bienvenido al Sistema</h1>
          <v-chip
      class="ma-2"
      color="primary"
      label
    >
      <v-icon left>mdi-account-circle-outline</v-icon>
      <span class="headline">{{ listar }}</span>
    </v-chip>
        <p class="subheading font-weight-regular">
          Sistema de Gestion Comercial
          <br />Desarrollador por Smart Systems
        </p>
      </v-flex>
      <v-flex xs12 mb-5>
        <v-chip class="blak--text text--lighten-1" color="indigo lighten-5" outlined>
          <v-icon left>mdi-server-plus</v-icon>Copia de Seguridad
        </v-chip>

        <v-chip class='white--text text--lighten-1' color="purple " outlined pill>
          Salir del Sistema
          <v-icon right>mdi-account-outline</v-icon>
        </v-chip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

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
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
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
}
</script>

<style>
</style>
