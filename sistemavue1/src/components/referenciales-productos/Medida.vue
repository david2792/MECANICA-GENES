<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Unidades de Medida</v-toolbar-title>
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
            <v-btn color="amber darken-4" dark class="mb-2" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="Descripcion" label="Descripción"></v-text-field>
                  </v-flex>
                </v-layout>
                <!--  -->
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="Simbolo" label="Simbolo"></v-text-field>
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
          <!-- dialogo confirmacion -->
        </v-dialog>
         <!-- inicio -->
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
                  <h3 class="white--text align-end">Se agrego la Unidad</h3>
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
                <!-- fin transaccion -->
      </v-toolbar>
      <v-data-table :headers="headers" :items="medidas" :search="search" class="elevation-1">
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
             <v-btn class="mx-2" fab dark small color="amber darken-4" @click="editItem(props.item)">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>{{ props.item.CodigoUnidad }}</td>
          <td>{{ props.item.Descripcion }}</td>
          <td>{{ props.item.Simbolo }}</td>
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
      medidas: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Codigo", value: "CodigoUnidad", sortable: true },
        { text: "Descripción", value: "Descripcion", sortable: false },
        { text: "Simbolo", value: "Simbolo", sortable: false }
      ],
      editedIndex: -1,
      dialogoConfirmacion:false,
      CodigoUnidad: "",
      Descripcion: "",
      Simbolo: "",
      validaMensaje: [],
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
      let me = this;
      axios
        .get("unidades/")
        .then(function(response) {
          me.medidas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this.Descripcion = "";
      this.Simbolo = "";
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.Descripcion.length < 1) {
        this.validaMensaje.push(
          "La descripcion de la unidad debe tener entre 1-50 caracteres."
        );
      }
      if (this.Simbolo.length < 1) {
        this.validaMensaje.push(
          "El simbolo de la unidad no debe tener más de 1 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      let me = this;
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //Código para editar
        console.log(this.CodigoUnidad, this.Descripcion, this.Simbolo);
        axios
          .put("unidades/", {
            CodigoUnidad: this.CodigoUnidad,
            Descripcion: this.Descripcion,
            Simbolo: this.Simbolo
          })
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
            me.dialogoConfirmacion=true;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .post("unidades/", {
            Descripcion: this.Descripcion,
            Simbolo: this.Simbolo
          })
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
             me.dialogoConfirmacion=true;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    editItem(item) {
      this.CodigoUnidad = item.CodigoUnidad;
      this.Descripcion = item.Descripcion;
      this.Simbolo = item.Simbolo;
      this.dialog = true;
      this.editedIndex = 1;
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.Descripcion;
      this.adSimbolo = item.Simbolo;
      this.adId = item.CodigoUnidad;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    activar() {
      let me = this;
      axios
        .put("unidades/", { CodigoUnidad: this.adId })
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adSimbolo = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      axios
        .put("unidades/deactivate", { _id: this.adId })
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
