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
                <v-checkbox v-model="enabled" hide-details class="shrink mr-2 mt-0"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12 md10>
                <v-autocomplete
                  :disabled="!enabled"
                  :items="recepcionvehiculos.rvehiculos"
                  :item-text="item => `${item.RazonSocial} - ${item.chapa}`"
                  item-value="chapa"
                  label="Buscar por número de chapa."
                  v-model="numerochapa"
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
      dialogo_reporte: false,
      numerochapa: "",
      enabled: false,
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
    filtrarPorfecha() {
      if (this.enabled) {
        return this.$store.state.recepcionvehiculos.rvehiculos.filter(
          item => item.chapa === this.numerochapa
        );
        console.log(this.fechaDesde, this.fechaFin);
      } else {
        return this.$store.state.recepcionvehiculos.rvehiculos;
      }
    },
    Imprimir_reporte(){
      let header={"auth-token":this.$store.state.token};
      let configuracion = { headers: header };
      this.$store.dispatch("getrvehiculos", configuracion);
      let list_recepcion = this.filtrarPorfecha();
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