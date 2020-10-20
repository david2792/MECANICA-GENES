<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float color="white">
        <v-toolbar-title>Recepción de Vehiculos</v-toolbar-title>
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
        <v-btn @click="dialogo_reporte = true">
          Generar Reporte.
          <v-icon>print</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Dialogo para guardar o imprimir informe -->
      <v-dialog v-model="dialogo_reporte" max-width="700px">
        <v-card>
          <v-card-title>Opciones de reportes</v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm12 md2>
                <v-checkbox
                  v-model="enabled"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12 md10>
                <v-autocomplete
                  :disabled="!enabled"
                  :items="recepcionvehiculos.rvehiculos"
                  :item-text="(item) => `${item.RazonSocial} - ${item.chapa}`"
                  item-value="chapa"
                  label="Buscar por número de chapa."
                  v-model="recepcionvehiculos.numerochapa"
                  @change="filtar()"
                ></v-autocomplete>
              </v-flex>
              <!-- Fecha desde -->
              <v-col sm6 md6>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="recepcionvehiculos.fechaDesde"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="recepcionvehiculos.fechaDesde"
                      label="Fecha Desde"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="Py"
                    v-model="recepcionvehiculos.fechaDesde"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(recepcionvehiculos.fechaDesde, filtrar())"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <!-- fin fecha desde -->
              <v-spacer></v-spacer>
              <!-- Fecha hasta -->
              <v-col sm6 md6>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="recepcionvehiculos.fechaHasta"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="recepcionvehiculos.fechaHasta"
                      label="Fecha Desde"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="Py"
                    v-model="recepcionvehiculos.fechaHasta"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(recepcionvehiculos.fechaHasta, filtrar())"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <!-- fin fecha hasta -->
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" dark @click="Imprimir_reporte()"
              >Ver informe</v-btn
            >
            <v-btn color="primary" dark @click="imprimir_todo()"
              >Ver Todo</v-btn
            >
            <v-btn color="primary" text @click="dialogo_reporte = false"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- fin dialogo informe -->

      <v-data-table
        :headers="headers"
        :items="recepcionvehiculos.rvehiculos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.numero }}</td>
          <td>{{ props.item.codigocliente }}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.Cedula }}</td>
          <td>{{ props.item.estado }}</td>
          <td>{{ props.item.estadorecepcion }}</td>
          <td>{{ props.item.fechaentrada }}</td>
          <td>{{ props.item.horaentrada }}</td>
          <td>{{ props.item.observaciones }}</td>
          <td>{{ props.item.km }}</td>
          <td>{{ props.item.nivel }}</td>
          <td>{{ props.item.chapa }}</td>

          <td></td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import printJS from "print-js";
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      dialogo_reporte: false,
      enabled: false,
      menu: false,
      modal: false,
      menu1: false,
      search: "",
      headers: [
        { text: "N° Recepción", value: "numero" },
        { text: "Código Cliente", value: "codigocliente" },
        { text: "Razon Social", value: "RazonSocial" },
        { text: "N° de Cédula", value: "Cedula" },
        { text: "Estado", value: "estado" },
        { text: "Esatdo Recepción", value: "estadorecepcion" },
        { text: "Fecha Entrada", value: "fechaentrada" },
        { text: "Hora Entrada", value: "horaentrada" },
        { text: "Observación", value: "observaciones" },
        { text: "Kilometro", value: "km" },
        { text: "Nivel Combustible", value: "nivel" },
        { text: "N° de Chapa", value: "chapa" },
      ],
    };
  },
  name: "InformeRecepcionVehiculos",
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configuration = { headers: header };
    this.$store.dispatch("getrvehiculos", configuration);
  },
  computed: {
    ...mapState(["recepcionvehiculos"]),
  },
  methods: {
    filtrar(){
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      if (this.enabled) {
        this.$store.dispatch("filtrar_Datos", configuracion);
        console.log("Datos filtrados: ", this.recepcionvehiculos.filtrar_rvehiculos) 
      } else {
        console.log("Filtrar sólo por fecha")
        this.$store
          .dispatch("getrvehiculosPorFecha", configuracion);
          console.log("Datos filtrados por fecha: ", this.recepcionvehiculos.filtar_fecha)
        }
    },
    Imprimir_reporte() {
      let lista = [];
      this.filtrar();
      
      if (this.enabled) {
        lista = this.recepcionvehiculos.filtrar_rvehiculos;
      } else {
        lista = this.recepcionvehiculos.filtar_fecha;
      }
      this.mostrar_pdf(lista)
    },
    imprimir_todo(){
      let lista = this.$store.state.recepcionvehiculos.rvehiculos;
      this.mostrar_pdf(lista)
    },
    mostrar_pdf(lista){
      printJS({
        printable: lista,
        properties: [
          { field: "numero", displayName: "Número" },
          { field: "codigocliente", displayName: "Número" },
          { field: "codigocliente", displayName: "Código Cliente" },
          { field: "RazonSocial", displayName: "Razón Social" },
          { field: "Cedula", displayName: "Cédula" },
          { field: "estado", displayName: "Estado" },
          { field: "estadorecepcion", displayName: "Estado Recepción" },
          { field: "fechaentrada", displayName: "Fecha Entrada" },
          { field: "horaentrada", displayName: "Hora Recepción" },
          { field: "observaciones", displayName: "Observaciones" },
          { field: "km", displayName: "Km" },
          { field: "nivel", displayName: "Nivel de Combustible" },
          { field: "chapa", displayName: "N° de Chapa" },
        ],
        header: "Listado de Recepciones",
        type: "json",
      });
    }
  },
};
</script>