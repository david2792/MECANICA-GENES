
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
