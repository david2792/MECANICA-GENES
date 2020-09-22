<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float color="white">
        <v-toolbar-title>Orden de Trabajo</v-toolbar-title>
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
                <v-checkbox v-model="enabled" hide-details class="shrink mr-2 mt-0"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12 md10>
                <v-autocomplete
                  :disabled="!enabled"
                  :items="rordenTrabajo.rOrdenTrabajos"
                  :item-text="item => `${item.RazonSocial} - ${item.numerochapa}`"
                  item-value="numerochapa"
                  label="Buscar por número de chapa."
                  v-model="numerochapa"
                  @keyup="filtrarPorfecha"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" dark @click="Imprimir_reporte()">Ver informe</v-btn>
            <v-btn color="primary" text @click="dialogo_reporte = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- fin dialogo informe -->
      <v-data-table
        :headers="headers"
        :items="rordenTrabajo.rOrdenTrabajos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.numero }}</td>
          <td>{{ props.item.RazonSocial}}</td>
          <td>{{ props.item.Cedula}}</td>
          <td>{{ props.item.estadorden }}</td>
          <td>{{ props.item.estadorecepcion }}</td>
          <td>{{ props.item.fechaentrada }}</td>
          <td>{{props.item.fechaemision}}</td>
          <td>{{ props.item.observacionrecepcion }}</td>
          <td>{{ props.item.kmrecepcion}}</td>
          <td>{{ props.item.numerochapa}}</td>

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
import { mapGetters, mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      dialogo_reporte: false,
      search: "",
      numerochapa: "",
      fechaDesde: "",
      fechaFin: "",
      enabled: false,
      menu: false,
      menu2: false,
      dialog: false,
      headers: [
        { text: "N° Recepción", value: "numero" },
        { text: "Razon Social", value: "RazonSocial" },
        { text: "N° de Cédula", value: "Cedula" },
        { text: "Estado", value: "estadorden" },
        { text: "Esatdo Recepción", value: "estadorecepcion" },
        { text: "Fecha Entrada", value: "fechaentrada" },
        { text: "Fecha Emisión", value: "fechaemision" },
        { text: "Observación", value: "observacionrecepcion" },
        { text: "Kilometro", value: "kmrecepcion" },
        { text: "N° de Chapa", value: "numerochapa" },
      ],
    };
  },
  name: "InformeOrdenTrabajo",
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configuracion = { headers: header };
    this.$store.dispatch("getrvordenTrabajo", configuracion);
    this.$store.dispatch("getClientes", configuracion);
  },
  computed: {
    ...mapState(["rordenTrabajo", "clientes"]),
  },
  methods: {
    filtrarPorfecha() {
      if (this.enabled) {
        return this.$store.state.rordenTrabajo.rOrdenTrabajos.filter(
          item => item.numerochapa === this.numerochapa
        );
        console.log(this.fechaDesde, this.fechaFin);
      } else {
        return this.$store.state.rordenTrabajo.rOrdenTrabajos;
      }
    },
    Imprimir_reporte() {
      let list_recepcion = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      this.$store.dispatch("getrvehiculos", configuracion);
      list_recepcion = this.filtrarPorfecha();
      // let f = f.getFullYear()+ "-"+ f.getMonth()+ "-" +f.getDate();
      console.log(this.fechaDesde, this.fechaFin, this.$store.state.rordenTrabajo.rOrdenTrabajos.fechaentrada);
      printJS({
        printable: list_recepcion,
        properties: [
          { field: "numero", displayName: "Número" },
          { field: "codigocliente", displayName: "Número" },
          { field: "RazonSocial", displayName: "Razón Social" },
          { field: "Cedula", displayName: "Cédula" },
          { field: "estadorden", displayName: "Estado" },
          { field: "estadorecepcion", displayName: "Estado Recepción" },
          { field: "fechaentrada", displayName: "Fecha Entrada" },
          { field: "fechaemision", displayName: "Fecha Emisión" },
          { field: "observacionrecepcion", displayName: "Observaciones" },
          { field: "kmrecepcion", displayName: "Km" },
          { field: "numerochapa", displayName: "N° de Chapa" },
        ],
        header: "Orden de trabajo",
        type: "json",
      });
    },
  },
};
</script>