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
        <v-btn @click="Imprimir_reporte()">
          Generar Reporte.
          <v-icon>print</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table :headers="headers" :items="rordenTrabajo.rOrdenTrabajos" :search="search" class="elevation-1"
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import printJS from 'print-js';
import { mapState } from "vuex";
import moment from 'moment';
export default {
  data() {
    return {
      // dialogo_reporte: false,
      search: "",
      headers: [
        { text: "N° Recepción", value: "numero"},
        { text: "Razon Social", value: "RazonSocial"},
        { text: "N° de Cédula", value: "Cedula"},
        { text: "Estado", value: "estadorden"},
        { text: "Esatdo Recepción", value: "estadorecepcion"},
        { text: "Fecha Entrada", value: "fechaentrada"},
        { text: "Fecha Emisión", value: "fechaemision"},
        { text: "Observación", value: "observacionrecepcion"},
        { text: "Kilometro", value: "kmrecepcion"},
        { text: "N° de Chapa", value: "numerochapa"}
      ],
    };
  },
  name: "InformeOrdenTrabajo",
  mounted() {
    let header={"auth-token":this.$store.state.token};
    let configuracion = { headers: header };
    this.$store.dispatch("getrvordenTrabajo", configuracion);
  },
  computed:{
    ...mapState(['rordenTrabajo']),
  },
  methods:{
    Imprimir_reporte(){
      let header={"auth-token":this.$store.state.token};
      let configuracion = { headers: header };
      this.$store.dispatch("getrvehiculos", configuracion);
      let list_recepcion = this.$store.state.rordenTrabajo.rOrdenTrabajos;
      // const list_irecepcion = this.productos.filter(pro => pro.Categoria == this.CodigoCategoria);
      // console.log(producto_F);
      printJS({printable: list_recepcion, 
      properties: 
        [
          { field: 'numero', displayName: 'Número'},
          { field: 'codigocliente', displayName: 'Número'},
          { field: 'RazonSocial', displayName: 'Razón Social'},
          { field: 'Cedula', displayName: 'Cédula'},
          { field: 'estadorden', displayName: 'Estado'},
          { field: 'estadorecepcion', displayName: 'Estado Recepción'},
          { field: 'fechaentrada', displayName: 'Fecha Entrada'},
          { field: 'fechaemision', displayName: 'Fecha Emisión'},
          { field: 'observacionrecepcion', displayName: 'Observaciones'},
          { field: 'kmrecepcion', displayName: 'Km'},
          { field: 'numerochapa', displayName: 'N° de Chapa'},
        ], header: 'Orden de trabajo',
      type: 'json'})
    },
  },
};
</script>