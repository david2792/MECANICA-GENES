<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Pais</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn  color="amber darken-4" dark class="mb-2" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="Nombre" label="Nombre"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-flex xs12 sm12 md12 v-show="valida">
                  <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                </v-flex>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
                <!-- dialogo confirmacion -->
        <template>
          <v-dialog v-model="dialogoConfirmacion" persistent max-width="400">
            <v-card dark color="blue lighten-3">
              <v-card-title class="headline">
                <v-img
                  class="white--text align-end"
                  :src="require('../../assets/ok.png')"
                  contain
                  height="100"
                ></v-img>
              </v-card-title>
              <center>
                <v-card-text>
                  <h3 class="white--text align-end">Se agrego el Pais</h3>
                </v-card-text>
              </center>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" text @click="dialogoConfirmacion = false">Aceptar</v-btn>
                <!-- <v-btn color="red " text @click="listarprecio(item)">Agregar Lista de Precio?</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <!-- fin dialogo -->
      </v-toolbar>
      <v-data-table :headers="headers" :items="paises" :search="search" class="elevation-1">
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
            <v-btn class="mx-2" fab dark small color="amber darken-4" @click="editItem(props.item)">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>{{ props.item.CodigoPais }}</td>
          <td>{{ props.item.Nombre }}</td>
          <td></td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      search: "",
      paises: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Codigo", value: "CodigoPais", sortable: true },
        { text: "Nombre", value: "Nombre", sortable: false }
      ],
      dialogoConfirmacion: false,
      editedIndex: -1,
      CodigoPais: "",
      Nombre: "",
      validaMensaje: [],
      valida: 0,
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: ""
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.listar();
  },
  methods: {
    listar() {

      let header={"auth-token":this.$store.state.token};
      let configuracion={headers:header};
      let me = this;
      axios
        .get("paises/",configuracion)
        .then(function(response) {
          me.paises = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this.Nombre = "";
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.Nombre.length < 1) {
        this.validaMensaje.push(
          "El nombre del pais debe tener entre 1-50 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      let header={"auth-token":this.$store.state.token};
      let configuracion={headers:header};
      let me = this;
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
      
        console.log(this.CodigoPais, this.Nombre);
        axios
          .put("paises/", {
            CodigoPais: this.CodigoPais,
            Nombre: this.Nombre
          },configuracion).then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
            me.dialogoConfirmacion = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .post("paises/", { Nombre: this.Nombre },configuracion)
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
            me.dialogoConfirmacion = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    editItem(item) {
      this.CodigoPais = item.CodigoPais;
      this.Nombre = item.Nombre;
      this.dialog = true;
      this.editedIndex = 1;
    },

    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    activar() {
      let me = this;
      axios
        .put("marcas/", { CodigoMarca: this.adId })
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>
