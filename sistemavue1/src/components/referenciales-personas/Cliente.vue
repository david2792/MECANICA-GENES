<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Clientes</v-toolbar-title>
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
                    <v-text-field v-model="RazonSocial" label="Razon Social"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="Ruc" label="RUC"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="Cedula" label="Número Documento"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="Direccion" label="Dirección"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="Telefono" label="Teléfono"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="Email" label="Email"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-autocomplete
                      :items="Ciudades"
                      v-model="Ciudad"
                      item-value="Ciudad"
                      label="Ciudad"
                      value="CodigoCiudad"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md12 v-show="valida">
                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                  </v-flex>
                </v-layout>
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
                  <h3 class="white--text align-end">Cliente Agregado</h3>
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
      <v-data-table :headers="headers" :items="personas" :search="search" class="elevation-1">
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
            <v-btn class="mx-2" fab dark small color="amber darken-4" @click="editItem(props.item)">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>{{ props.item.CodigoCliente }}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.Cedula }}</td>
          <td>{{ props.item.Ruc }}</td>
          <td>{{ props.item.Direccion }}</td>
          <td>{{ props.item.Telefono }}</td>
          <td>{{ props.item.Email }}</td>
          <td>{{ props.item.Ciudad }}</td>
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
      personas: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Codigo", value: "CodigoCliente", sortable: true },
        { text: "Razon Social", value: "RazonSocial", sortable: true },
        { text: "Cedula", value: "Cedula", sortable: true },
        { text: "RUC", value: "Ruc", sortable: false },
        { text: "Dirección", value: "Direccion", sortable: false },
        { text: "Teléfono", value: "Telefono", sortable: false },
        { text: "Email", value: "Email", sortable: false },
        { text: "Ciudad", value: "Ciudad", sortable: false }
      ],
      editedIndex: -1,
      dialogoConfirmacion: false,
      RazonSocial: "",
      CodigoCliente:'',
      Cedula: "",
      Ruc: "",
      Direccion: "",
      Telefono: "",
      Ciudad: "",
      Email: "",
      Ciudades:[],
      valida: 0,
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
    this.selectCiudad();
  },
  methods: {
    listar() {
      let me = this;
      axios
        .get("clientes/")
        .then(function(response) {
          me.personas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this.Nombre = "";
      this.RazonSocial = "";
      this.Direccion = "";
      this.Telefono = "";
      this.Cedula='';
      this.Ruc='';
      this.Email = "";
      this.Ciudad='';
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.RazonSocial.length < 1 ) {
        this.validaMensaje.push(
          "El nombre de la persona debe tener entre 1-50 caracteres."
        );
      }
      if (this.Cedula.length < 1) {
        this.validaMensaje.push(
          "El cedula no puede estar vacia."
        );
      }
      if (this.Direccion.length < 1) {
        this.validaMensaje.push(
          "La dirección no puede estar vacia."
        );
      }
      if (this.Telefono.length  < 1) {
        this.validaMensaje.push(
          "El teléfono no  puede estar vacio."
        );
      }
      if (this.Ciudad.length < 1) {
        this.validaMensaje.push(
          "La Ciudad del usuario no puede estar vacio."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    selectCiudad() {
      let me = this;
      let ciudadArray = [];
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("ciudades/", configuracion)
        .then(function(response) {
          ciudadArray = response.data;
          ciudadArray.map(function(x) {
            me.Ciudades.push({
              text: x.Ciudad,
              value: x.CodigoCiudad
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    guardar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //Código para editar
        console.log(this.Ciudad)
        axios
          .put(
            "clientes/",
            {
              CodigoCliente:this.CodigoCliente,
              CodigoCiudad: this.CodigoCiudad,
              RazonSocial: this.RazonSocial,
              Cedula: this.Cedula,
              Ruc: this.Ruc,
              Ciudad: this.Ciudad,
              Direccion: this.Direccion,
              Telefono: this.Telefono,
              Email: this.Email
            },
            configuracion
          )
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
            me.dialogoConfirmacion = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        axios
          .post(
            "clientes/",
            {
            CodigoCiudad: this.CodigoCiudad,
              RazonSocial: this.RazonSocial,
              Cedula: this.Cedula,
              Ruc: this.Ruc,
              Ciudad: this.Ciudad,
              Direccion: this.Direccion,
              Telefono: this.Telefono,
              Email: this.Email
            },
            configuracion
          )
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
      this.CodigoCliente = item.CodigoCliente;
      this.RazonSocial = item.RazonSocial;
      this.Ruc = item.Ruc;
      this.Cedula = item.Cedula;
      this.Direccion = item.Direccion;
      this.Telefono = item.Telefono;
      this.Email = item.Email;
      this.Ciudad = item.Ciudad;
      this.dialog = true;
      this.editedIndex = 1;
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item._id;
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
 
    close() {
      this.dialog = false;
      this.limpiar();
    }
  }
};
</script>