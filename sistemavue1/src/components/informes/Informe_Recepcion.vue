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
        <v-btn @click="Imprimir_reporte()">
          Generar Reporte.
          <v-icon>print</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table :headers="headers" :items="recepcionvehiculos.rvehiculos" :search="search" class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.numero }}</td>
          <td>{{ props.item.codigocliente }}</td>
          <td>{{ props.item.RazonSocial}}</td>
          <td>{{ props.item.Cedula}}</td>
          <td>{{ props.item.estado }}</td>
          <td>{{ props.item.estadorecepcion }}</td>
          <td>{{ props.item.fechaentrada }}</td>
          <td>{{props.item.horaentrada}}</td>
          <td>{{ props.item.observaciones }}</td>
          <td>{{ props.item.km}}</td>
          <td>{{ props.item.nivel}}</td>
          <td>{{ props.item.chapa}}</td>

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
        { text: "Código Cliente", value: "codigocliente"},
        { text: "Razon Social", value: "RazonSocial"},
        { text: "N° de Cédula", value: "Cedula"},
        { text: "Estado", value: "estado"},
        { text: "Esatdo Recepción", value: "estadorecepcion"},
        { text: "Fecha Entrada", value: "fechaentrada"},
        { text: "Hora Entrada", value: "horaentrada"},
        { text: "Observación", value: "observaciones"},
        { text: "Kilometro", value: "km"},
        { text: "Nivel Combustible", value: "nivel"},
        { text: "N° de Chapa", value: "chapa"}
      ],
    };
  },
  name: "InformeRecepcionVehiculos",
  mounted() {
    let header={"auth-token":this.$store.state.token};
    let configuracion = { headers: header };
    this.$store.dispatch("getrvehiculos", configuracion);
  },
  computed:{
    ...mapState(['recepcionvehiculos']),
  },
  methods:{
    Imprimir_reporte(){
      let header={"auth-token":this.$store.state.token};
      let configuracion = { headers: header };
      this.$store.dispatch("getrvehiculos", configuracion);
      let list_recepcion = this.$store.state.recepcionvehiculos.rvehiculos;
      // const list_irecepcion = this.productos.filter(pro => pro.Categoria == this.CodigoCategoria);
      // console.log(producto_F);
      printJS({printable: list_recepcion, 
      properties: 
        [
          { field: 'numero', displayName: 'Número'},
          { field: 'codigocliente', displayName: 'Número'},
          { field: 'codigocliente', displayName: 'Código Cliente'},
          { field: 'RazonSocial', displayName: 'Razón Social'},
          { field: 'Cedula', displayName: 'Cédula'},
          { field: 'estado', displayName: 'Estado'},
          { field: 'estadorecepcion', displayName: 'Estado Recepción'},
          { field: 'fechaentrada', displayName: 'Fecha Entrada'},
          { field: 'horaentrada', displayName: 'Hora Recepción'},
          { field: 'observaciones', displayName: 'Observaciones'},
          { field: 'km', displayName: 'Km'},
          { field: 'nivel', displayName: 'Nivel de Combustible'},
          { field: 'chapa', displayName: 'N° de Chapa'},
        ], header: 'Listado de Recepciones',
      type: 'json'})
    },
  },
};
</script>