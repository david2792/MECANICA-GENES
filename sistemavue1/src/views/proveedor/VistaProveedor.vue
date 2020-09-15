<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float color="white">
        <v-toolbar-title>Proveedor</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1200px">
          <template v-slot:activator="{ on }">
            <v-btn color="amber darken-4" dark class="mb-2" v-on="on">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
          <FormularioProveedor/>
        </v-dialog>
      </v-toolbar>
      <ListaProveedor/>
    </v-flex>
  </v-layout>
</template>
<script>
import FormularioProveedor from "./FormularioProveedor";
import ListaProveedor from "./ListaProveedor";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    FormularioProveedor,
    ListaProveedor
  },
};
</script>