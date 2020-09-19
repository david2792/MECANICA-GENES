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
              <v-text-field v-model="vProveedor.Proveedor.CodigoProveedor" label="Código Proveedor."></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.RazonSocial" label="Nombre y Apellido."></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.Cedula" label="N° de Cédula."></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.Ruc" label="RUC."></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.Direccion" label="Dirección."></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.Telefono" label="Teléfono."></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.Email" label="Email."></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.Web" label="Web."></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-autocomplete
                :items="ciudad.Ciudades"
                :item-text="item => `${item.CodigoCiudad} - ${item.Ciudad}`"
                item-value="CodigoCiudad"
                label="Ciudad"
                v-model="vProveedor.Proveedor.CodigoCiudad"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <!-- Acciones del formularios(Guardar/Cancelar) -->
        <v-spacer></v-spacer>
        <v-btn class="mb-2" dark color="red accent-3" @click="modal=!modal">
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
        <v-btn color="green darken-3" class="mb-2" dark @click="guardar()">
          Guardar
          <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      // Proveedor: this.$store.state.vProveedor.Proveedor,
      token_configuration: [],
    };
  },
  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getCiudades", this.token_configuration);
    // this.$store.dispatch("getProveedor");
  },
  computed: {
    ...mapState(["ciudad", "vProveedor"]),
     modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
    ...mapGetters([
      'setProveedor',
    ])
  },
  methods: {
    createFreshProveedor() {
      return {
        CodigoProveedor: "",
        RazonSocial: "",
        Cedula: "",
        Ruc: "",
        Direccion: "",
        Telefono: "",
        Email: "",
        Web: "",
        CodigoCiudad: "",
        configuracion: [],
      };
    },
    guardar() {
      this.$store.dispatch("guardarProveedor", this.token_configuration).then(this.registroExitoso, this.regitroError);
    },
    registroExitoso(result){
      console.log("La operación fue correcta:", result);
    },
    regitroError(error){
      console.log("Hubo un error al realizar la operación", error);
    }
  },
};
</script>