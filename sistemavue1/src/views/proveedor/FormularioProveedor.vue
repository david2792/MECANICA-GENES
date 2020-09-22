<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-title>
        <!-- Titulo del formulalrio -->
      </v-card-title>
      <v-card-text>
        <!-- Cuerpo del formulario(inputs) -->
        <v-container grid-list-md>
          <v-layout wrap>
            <!-- <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.CodigoProveedor" label="Código Proveedor."></v-text-field>
            </v-flex>-->
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="vProveedor.Proveedor.RazonSocial"
                label="Nombre y Apellido."
                :rules="rsRules"
                autofocus
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="vProveedor.Proveedor.Cedula"
                label="N° de Cédula."
                :rules="CedulaRules"
                @keyup="validarCIProveedor"
              ></v-text-field>
              <v-alert :value="this.vProveedor.show_alert" color="error" icon="warning" outline>El registro ya está en uso.</v-alert>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <v-text-field v-model="vProveedor.Proveedor.Ruc" label="RUC." :rules="rucRules"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                v-model="vProveedor.Proveedor.Direccion"
                label="Dirección."
                :rules="direccionRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                v-model="vProveedor.Proveedor.Telefono"
                label="Teléfono."
                :rules="telefonoRules"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <v-text-field
                v-model="vProveedor.Proveedor.Email"
                label="Email."
                :rules="emailRules"
                @keyup="validarEmailProveedor"
              ></v-text-field>
              <v-alert :value="this.vProveedor.show_alertE" color="error" icon="warning" outline>El registro ya está en uso.</v-alert>
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
        <v-btn
          class="mb-2"
          dark
          color="red accent-3"
          @click="cancelarRegistro()"
        >
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
        <v-btn color="green darken-3" class="mb-2" dark @click="guardar()">
          Guardar
          <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      token_configuration: [],
      rsRules: [(v) => !!v || "Nombre es requerido."],
      emailRules: [
        (v) => !!v || "E-mail es requerido.",
        (v) => /.+@.+/.test(v) || "E-mail no valido",
      ],
      telefonoRules: [(v) => !!v || "Telefono es requerido."],
      rucRules: [(v) => !!v || "Ruc es requerido."],
      CedulaRules: [(v) => !!v || "Cédula es requerido."],
      direccionRules: [(v) => !!v || "Dirección es requerido."],
    };
  },

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getCiudades", this.token_configuration);
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
    ...mapGetters(["setProveedor"]),
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
      if (this.$refs.form.validate()) {
        console.log("Intentando registrar!")
        this.snackbar = true;
        this.$store
          .dispatch("guardarProveedor", this.token_configuration)
          .then(this.registroExitoso, this.regitroError);
      }
    },
    registroExitoso(result) {
      console.log("La operación fue correcta:", result);
      this.vProveedor.Proveedor = this.createFreshProveedor();
      if (this.$store.state.dialogo.dialog) {
        this.modal = !this.modal;
      }
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
    cancelarRegistro() {
      this.vProveedor.Proveedor = this.createFreshProveedor();
      this.modal = !this.modal;
    },

    validarCIProveedor() {
      this.$store.dispatch("buscarCIProveedor");
    },
    validarEmailProveedor() {
      this.$store.dispatch("buscarEmailProveedor");
    },
  },
};
</script>