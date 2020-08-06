<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar-title>Lista de Precio</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <!-- formulario -->
      <v-layout wrap>
        <v-flex xs12 sm12 md4>
          <v-text-field v-model="codigoproducto" label="C. del Producto"></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md8>
          <v-text-field v-model="descri" label="Descripcion"></v-text-field>
        </v-flex>
      </v-layout>
      <!--  -->
      <v-layout wrap>
        <v-flex xs12 sm12 md12>
          <v-text-field v-model="depo" label="Deposito"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 sm12 md8>
          <v-text-field v-model="Descripcion" label="Descripcion del Precio"></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md2>
          <v-text-field v-model="Precio" label="Precio"></v-text-field>
          <p>
          </p>
        </v-flex>
        <v-flex xs12 sm12 md2>
          <v-text-field v-model="Cuotas" label="Cuotas"></v-text-field>
        </v-flex>
      </v-layout>
      <!-- fin formulario -->
      <!-- dialogo -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="Codigo" label="Codigo"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="Descripcion" label="Descripción"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="Precio" label="Descripción"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="Cuotas" label="Precio"></v-text-field>
                </v-flex>
              </v-layout>  
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="actualizar">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- dialogo confirmacion -->
      <template>
        <v-dialog v-model="dialogoConfirmacion" max-width="400">
          <v-card dark color="blue lighten-3">
            <v-card-title class="headline">
              <v-img :src="require('../../assets/ok.png')" class="my-3" contain height="100"></v-img>
            </v-card-title>
            <center>
              <v-card-text>
                <h3>Tansaccion Correcta</h3>
              </v-card-text>
            </center>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange " text @click="dialogoConfirmacion = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <!-- fin dialogo -->
      <v-data-table :headers="headers" :items="lista" :search="search" class="elevation-1">
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
            <template>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="deep-purple accent-3"
                @click="editItem(props.item)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <template v-if="props.item.Estado=='ACTIVADO'">
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="deep-orange accent-3"
                @click="desactivarLista(props.item)"
              >
                <v-icon dark>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </template>
            <template v-if="props.item.Estado=='DESACTIVADO'">
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink darken-4"
                @click="desactivarLista(props.item)"
              >
                <v-icon dark>mdi-cancel</v-icon>
              </v-btn>
            </template>
          </td>
          <td>{{ props.item.Codigo }}</td>
          <td>{{ props.item.CodigoProducto }}</td>
          <td>{{ props.item.Descripcion }}</td>
          <td>{{ props.item.Cuotas }}</td>
          <td>{{ props.item.PrecioCompra }}</td>
          <td>{{ props.item.Nombre }}</td>
          <td>{{ props.item.Estado }}</td>
          <td></td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-flex xs4 sm4 md4>
        <v-btn color="red accent-4" dark @click="close">
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
        <v-btn color="green darken-4" dark @click="guardar">
          Guardar
          <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <router-link to="/productos">
          <v-btn color="grey darken-4" dark>
            Regresar
            <v-icon dark right>mdi-cloud-upload</v-icon>
          </v-btn>
        </router-link>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import VueNumeric from 'vue-numeric';
export default {
  data() {
    return {
      dialog: false,
      dialogoConfirmacion: false,
      search: "",
      lista: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Codigo", value: "Codigo", sortable: true },
        { text: "Codigo Producto", value: "CodigoProducto", sortable: false },
        { text: "Descripcion", value: "Descripcion", sortable: false },
        { text: "Cuotas", value: "Cuotas", sortable: false },
        { text: "Precio Compra", value: "PrecioCompra", sortable: false },
        { text: "Deposito", value: "Nombre", sortable: false },
        { text: "Estado", value: "Estado", sortable: false }
      ],
      editedIndex: -1,
      Codigo: "",
      Estado: "DESABILITADO",
      CodigoProducto: "",
      CodigoDeposito: "",
      Descripcion: "",
      Precio: "",
      PrecioCompra: "",
      Cuotas: "",
      codigoproducto: this.$route.params.id,
      descri: this.$route.params.descripcion,
      depo: this.$route.params.deposito,
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
      let idproducto = this.$route.params.id;
      let descri = this.$route.params.descripcion;
      let me = this;
      axios
        .get("listasprecios/" + idproducto + "")
        .then(function(response) {
          me.lista = response.data;
          console.log(descri);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this.Descripcion = "";
      this.Precio = "";
      this.Cuotas = "";
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.Descripcion.length < 1 || this.Descripcion.length > 50) {
        this.validaMensaje.push(
          "El nombre de la marca debe tener entre 1-50 caracteres."
        );
      }
      if (this.Descripcion.length > 255) {
        this.validaMensaje.push(
          "La descripción de la marca no debe tener más de 255 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    actualizar() {
      let me = this;
      console.log(this.Descripcion)
      axios
        .put("listasprecios/actualizar", {
          Codigo: this.Codigo,
          codigoproducto: this.codigoproducto,
          Descripcion: this.Descripcion,
          Precio: this.Precio,
          Cuotas: this.Cuotas
        })
        .then(function(response) {
          me.limpiar();
          me.close();
          me.listar();
          me.dialogoConfirmacion = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    guardar() {
      let me = this;
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
      } else {
        axios
          .post("listasprecios/", {
            depo: this.depo,
            codigoproducto: this.codigoproducto,
            Descripcion: this.Descripcion,
            Precio: this.Precio,
            Cuotas: this.Cuotas
          })
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
    desactivarLista(item) {
      let me = this;
      this.Codigo = item.Codigo;
      this.Estado = item.Estado;
      console.log(this.Codigo);
      axios
        .put("listasprecios/", { Codigo: this.Codigo, Estado: this.Estado })
        .then(function(response) {
          me.listar();
          console.log("paso");
        })
        .catch(function(error) {
          console.log(error);
          console.log("error");
        });
    },
    editItem(item) {
      this.Codigo = item.Codigo;
      this.Descripcion = item.Descripcion;
      this.Precio = item.Precio;
      console.log(item.Cuotas);
      this.Cuotas = item.Cuotas;
      this.dialog = true;
      this.editedIndex = 1;
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    close() {
      this.dialog = false;
    },
    close2() {
      this.dialogoConfirmacion = false;
    }
  }
};
</script>
