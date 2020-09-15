<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float color="white">
        <v-toolbar-title>Timbrados</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
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

        <!-- Inicio Dialogo agregar  Timbrados -->
        <v-dialog v-model="dialog" max-width="1200px">
          <template v-slot:activator="{ on }">
            <v-btn color="amber darken-4" dark class="mb-2" v-on="on">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <!-- <span class="headline">{{ formTitle }}</span> -->
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-show='editedIndex' v-model="timbrado.NumeroTimbrado" label="Número Timbrado"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-autocomplete
                      :items="sucursales.sucursales"
                      v-model="timbrado.CodigoSucursal"
                      item-text="Nombre"
                      item-value="CodigoSucursal"
                      label="Sucursal"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-autocomplete
                      :items="tipoDocumento.tipoDocumentos"
                      v-model="timbrado.CodigoTiposDocumento"
                      item-text="Descripcion"
                      item-value="Codigo"
                      label="Tipos de Documento"
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="timbrado.PuntoExpedicion" label="Punto de Expedicion"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="timbrado.NumeroInicial" label="Número Inicial"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="timbrado.NumeroFinal" label="Punto Final"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md6>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="timbrado.FechaInicioVigencia"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="timbrado.FechaInicioVigencia"
                          label="Fecha inicio vigencia"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="timbrado.FechaInicioVigencia" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(timbrado.FechaInicioVigencia)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="timbrado.FechaFinVigencia"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="timbrado.FechaFinVigencia"
                          label="Fecha fin vigencia"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="timbrado.FechaFinVigencia" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu2.save(timbrado.FechaFinVigencia)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>

                <v-flex xs12 sm12 md12>
                  <!-- <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div> -->
                  <v-checkbox v-model="timbrado.Estado" label="Estado"></v-checkbox>
                </v-flex>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mb-2" dark color="red accent-3" @click="dialogoReset()">
                Cancelar
                <v-icon dark right>mdi-cancel</v-icon>
              </v-btn>
              <v-btn color="green darken-3" class="mb-2" dark @click="guardar()">
                Guardar
                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Fin Dialogo agregar Timbrados -->
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="timbrados.timbrados"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
            <template>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="amber darken-4"
                @click="editItem(props.item)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </template>

            <template>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="purple darken-1"
                @click="listarprecio(props.item)"
              >
                <v-icon dark>mdi-wrench</v-icon>
              </v-btn>
            </template>
          </td>
          <td>{{ props.item.NumeroTimbrado }}</td>
          <td>{{ props.item.CodigoSucursal }}</td>
          <td>{{ props.item.PuntoExpedicion }}</td>
          <td>{{ props.item.FechaInicioVigencia }}</td>
          <td>{{props.item.FechaFinVigencia}}</td>
          <!-- <td>{{ props.item.StockActual }}</td>
          <td>{{ props.item.StockMinimo }}</td>
          <td>{{ props.item.Marca}}</td>
          <td>{{ props.item.Categoria}}</td>
          <td>{{ props.item.Impuesto}}</td>
          <td>{{ props.item.Deposito}}</td>-->

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
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Opciones", value: "opciones" },
        { text: "N° Timbrado", value: "NumeroTimbrado" },
        { text: "Código Sucursal", value: "CodigoSucursal" },
        { text: "Punto de Expedición", value: "PuntoExpedicion" },
        { text: "Fecha inicio Vigencia", value: "FechaInicioVigencia" },
        { text: "Fecha fin vigencia", value: "FechaFinVigencia" },
      ],
      timbrado: this.createFreshTimbrado(),
      menu: false,
      menu2: false,
      dialog: false,
      token_configracion: [],
      editedIndex: true,
    };
  },
  name: "ListadoTimbrado",
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configuracion = { headers: header };
    this.token_configracion = configuracion;
    this.$store.dispatch("getTimbrados", configuracion);
    this.$store.dispatch("getSucursales", configuracion);
    this.$store.dispatch("getTipoDocumentos", configuracion);
  },
  computed: {
    ...mapState(["timbrados", "sucursales", "tipoDocumento"]),
  },
  methods: {
    createFreshTimbrado() {
      return {
        NumeroTimbrado: "",
        CodigoSucursal: "",
        PuntoExpedicion: "",
        CodigoTiposDocumento: "",
        FechaInicioVigencia: new Date().toISOString().substr(0, 10),
        FechaFinVigencia: new Date().toISOString().substr(0, 10),
        NumeroInicial: "",
        NumeroFinal: "",
        Estado: "",
        configuracion: [],
      };
    },
    guardar() {
      this.timbrado.configuracion = this.token_configracion;
      if (this.editedIndex) {
        this.$store
          .dispatch("insertTimbrado", this.timbrado)
          .then((result) => {
            console.log("Good job");
            this.timbrado = this.createFreshTimbrado();
          })
          .catch((err) => {
            console.log("Bad! this is sad");
          });
      }else{
        console.log("Enviando datos pra editar")
        this.$store
          .dispatch("updateTimbrado", this.timbrado)
          .then((result) => {
            console.log("Good job");
            this.timbrado = this.createFreshTimbrado();
          })
          .catch((err) => {
            console.log("Bad! this is sad");
          });
      }
    },
    editItem(item) {
      this.timbrado = item;
      console.log(this.timbrado);
      this.dialog = true;
      this.editedIndex = false;
    },
    dialogoReset(){
      this.dialog = false;
      this.editedIndex = true;
      this.timbrado = this.createFreshTimbrado();
    }
  },
};
</script>