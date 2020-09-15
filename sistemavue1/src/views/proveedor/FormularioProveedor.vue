<template>
  <v-card>
    <v-card-title>
      <!-- Titulo del formulalrio -->
    </v-card-title>
    <v-card-text>
      <!-- Cuerpo del formulario(inputs) -->
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <v-text-field label="Código Proveedor."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field label="Nombre y Apellido."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field label="N° de Cédula."></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <v-text-field label="RUC."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field label="Dirección."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field label="Teléfono."></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <v-text-field label="Email."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field label="Web."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-autocomplete
              item-text="Nombre"
              item-value="CodigoSucursal"
              label="Sucursal"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <!-- Acciones del formularios(Guardar/Cancelar) -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    data(){
        return {

        };
    },
    // name: 'FormularioProveedor',
    
    mounted(){

    },
}
</script>