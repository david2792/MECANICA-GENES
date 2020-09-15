<template>
    <v-card>
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
          <td>{{ props.item.Deposito}}</td> -->

          <td></td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
export default {
    data(){
        return{
            search: "",
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
        }
    },
    methods:{
        listar(){},
        editItem(item){},
    }
}
</script>