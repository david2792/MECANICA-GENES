<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="vProveedor.proveedores"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="justify-center layout px-0">
          <template>
            <v-btn class="mx-2" fab dark small color="amber darken-4" @click="editItem(props.item)">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </td>
        <td>{{ props.item.CodigoProveedor }}</td>
        <td>{{ props.item.RazonSocial }}</td>
        <td>{{ props.item.Cedula }}</td>
        <td>{{ props.item.Ruc }}</td>
        <td>{{props.item.Direccion}}</td>
        <td>{{ props.item.Telefono }}</td>
        <td>{{ props.item.Email }}</td>
        <td>{{ props.item.Web}}</td>
        <td>{{ props.item.Ciudad}}</td>
        <!-- <td>{{ props.item.Impuesto}}</td>
        <td>{{ props.item.Deposito}}</td>-->

        <td></td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="listar()">Resetear</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      dialog: false,
      token_configuration: [],
      headers: [
        { text: "Opciones", value: "opciones" },
        { text: "Código Proveedor", value: "CodigoProveedor" },
        { text: "Nombre proveedor", value: "RazonSocial" },
        { text: "Cédula", value: "Cedula" },
        { text: "Ruc", value: "Ruc" },
        { text: "Dirección", value: "Direccion" },
        { text: "Teléfono", value: "Telefono" },
        { text: "Email", value: "Email" },
        { text: "Web", value: "Web" },
        { text: "Ciudad", value: "Ciudad" },
      ],
    };
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };

    this.$store.dispatch("getProveedores", this.token_configuration);
  },
  computed: {
    ...mapState(["vProveedor"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
  },
  methods: {
    editItem(item) {
      this.modal = !this.modal;
      this.$store.vProveedor.Proveedor.edit = true;
      this.$store.dispatch("getProveedor", item);
      // console.log("Hello wey", this.$store.state.vProveedor.Proveedor);
    },
  },
};
</script>