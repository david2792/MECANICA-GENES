<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="timbradosAlias.timbrados"
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
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "N° Timbrado", value: "opciones", sortable: false },
        { text: "Código Sucursal", value: "CodigoProducto", sortable: true },
        { text: "Punto de Expedición", value: "CodigoBarra", sortable: false },
        {
          text: "Fecha inicio Vigencia",
          value: "Descripcion",
          sortable: false
        },
        { text: "Fecha fin vigencia", value: "PrecioCompra", sortable: false }
      ]
    };
  },
  name: "ListadoTimbrado",
  mounted() {
    this.$store.dispatch("getTimbrados");
  },
  computed: mapState({
    timbrados: state => state.timbrados,
    timbradosAlias: "timbrados"
  })
};
</script>