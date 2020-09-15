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
            <v-text-field v-model="Proveedor.CodigoProveedor" label="Código Proveedor."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field v-model="Proveedor.RazonSocial"  label="Nombre y Apellido."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field v-model="Proveedor.Cedula"  label="N° de Cédula."></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <v-text-field v-model="Proveedor.Ruc"  label="RUC."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field v-model="Proveedor.Direccion"  label="Dirección."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field v-model="Proveedor.Telefono"  label="Teléfono."></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <v-text-field v-model="Proveedor.Email"  label="Email."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-text-field v-model="Proveedor.Web"  label="Web."></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-autocomplete
              item-text="Nombre"
              item-value="CodigoCiudad"
              label="Ciudad"
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
          Proveedor: this.createFreshProveedor(),
        };
    },
    // name: 'FormularioProveedor',
    
    mounted(){

    },

    methods:{
      createFreshProveedor(){
        return{
          CodigoProveedor: "",
          RazonSocial: "",
          Cedula: "",
          Ruc: "",
          Direccion: "",
          Telefono: "",
          Email: "",
          Web: "",
          CodigoCiudad: ""
        }
      }
    },
}
</script>