
<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Registro de Vehiculos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-if="verNuevo==0"
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-if="verNuevo==0" @click="mostrarNuevo()" dark class="mb-2">Nuevo</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="vehiculo"
        :search="search"
        class="elevation-1"
        v-if="verNuevo==0"
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
          </td>
          <td>{{ props.item.Ruc }}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.chapa }}</td>
          <td>{{ props.item.chasis }}</td>
          <td>{{ props.item.transmicion }}</td>
          <td>{{ props.item.traccion }}</td>
          <td>{{ props.item.modelo }}</td>
          <td>{{ props.item.marca }}</td>
          <td>{{ props.item.combustible }}</td>
          <td>{{ props.item.color }}</td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
        <v-layout row wrap>
          <v-flex xs12 sm8 md8 lg8 xl8>
            <v-autocomplete :items="clientes" v-model="cliente" item-value="value" label="cliente"></v-autocomplete>
          </v-flex>
          <v-flex xs1 sm2 md2 lg2 xl2>
            <v-btn small fab dark color="teal" @click="mostrarModalArticulos()">
              <v-icon dark>list</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
              :items="transmiciones"
              v-model="transmicion"
              item-value="value"
              label="Tipo Transmicion"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
              :items="tracciones"
              v-model="traccion"
              item-value="value"
              label="Tipo Traccion"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete :items="modelos" v-model="modelo" item-value="value" label="Modelo"></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete :items="marcas" v-model="marca" item-value="value" label="Marca"></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
              :items="combustibles"
              v-model="combustible"
              item-value="value"
              label="Combustible"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete :items="anios" v-model="anio" item-value="value" label="Anios"></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete :items="colores" v-model="color" item-value="value" label="Colores"></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field v-model="chasis" label="N. Chasis"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field v-model="chapa" label="N. Chapa"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>    
          </v-flex>
          <v-flex xs12 sm12 md12 v-show="valida">
            <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="blue darken-1" flat @click.native="ocultarNuevo()">Cancelar</v-btn>
            <v-btn color="success" @click="guardar()">Guardar</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import Cliente from '../referenciales-personas/Cliente';
export default {
  data() {
    return {
      dialog: false,
      search: "",
      vehiculo: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "RUC ", value: "Ruc", sortable: true },
        { text: "RAZON SOCIAL", value: "RazonSocial", sortable: true },
        { text: "CHAPA", value: "chapa", sortable: true },
        { text: "CHASIS", value: "chasi", sortable: false },
        { text: "TRANSMICION", value: "transmicion", sortable: false },
        { text: "TRACCION", value: "traccion", sortable: false },
        { text: "MODELO", value: "modelo", sortable: false },
        { text: "MARCA", value: "marca", sortable: false },
        { text: "COMBUSTIBLE", value: "combustible", sortable: false },
        { text: "COLOR", value: "color", sortable: false },
      ],
      _id: "",
      persona: "",
      personas: [],
      transmiciones: [],
      marcas: [],
      modelos: [],
      combustibles: [],
      tracciones: [],
      colores: [],
      anios: [],
      cliente: "",
      marca: "",
      modelo: "",
      transmicion: "",
      combustible: "",
      traccion: "",
      color: "",
      anio: "",
      chapa: "",
      chasis: "",
      codigo: "",
      clientes: [],
      tipo_comprobante: "",
      comprobantes: ["BOLETA", "FACTURA", "TICKET", "GUIA"],
      serie_comprobante: "",
      num_comprobante: "",
      impuesto: 0.18,
      codigo: "",
      cabeceraDetalles: [
        { text: "Borrar", value: "borrar", sortable: false },
        { text: "Artículo", value: "articulo", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Sub Total", value: "subtotal", sortable: false },
      ],
      detalles: [],
      verNuevo: 0,
      errorArticulo: null,
      total: 0,
      totalParcial: 0,
      totalImpuesto: 0,
      articulos: [],
      texto: "",
      cabeceraArticulos: [
        { text: "Seleccionar", value: "seleccionar", sortable: false },
        { text: "Código", value: "codigo", sortable: false },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Categoría", value: "categoria.nombre", sortable: true },
        { text: "Stock", value: "stock", sortable: false },
        { text: "Precio Venta", value: "precio_venta", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      verDetalle: 0,
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
    };
  },
  computed: {
    calcularTotal: function () {
      let resultado = 0.0;
      for (var i = 0; i < this.detalles.length; i++) {
        resultado =
          resultado +
          (this.detalles[i].cantidad * this.detalles[i].precio -
            this.detalles[i].descuento);
      }
      return resultado;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listar();
    this.selectPersona();
    this.selectTransmicion();
    this.selectTraccion();
    this.selectModelo();
    this.selectMarca();
    this.selectCombustible();
    this.selectColores();
    this.selectAnios();
  },
  methods: {
    selectPersona() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("clientes/", configuracion)
        .then(function (response) {
          personaArray = response.data;

          personaArray.map(function (x) {
            me.clientes.push({ text: x.RazonSocial, value: x.CodigoCliente });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectTransmicion() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("estadotransmiciones/", configuracion)
        .then(function (response) {
          personaArray = response.data;

          personaArray.map(function (x) {
            me.transmiciones.push({ text: x.nombre, value: x.codigo });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectTraccion() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("tracciones/", configuracion)
        .then(function (response) {
          personaArray = response.data;
          console.log(personaArray);
          personaArray.map(function (x) {
            me.tracciones.push({ text: x.nombre, value: x.codigo });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectModelo() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("modelovechiculos/", configuracion)
        .then(function (response) {
          personaArray = response.data;

          personaArray.map(function (x) {
            me.modelos.push({ text: x.nombre, value: x.codigo });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectMarca() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("marcavehiculos/", configuracion)
        .then(function (response) {
          personaArray = response.data;

          personaArray.map(function (x) {
            me.marcas.push({ text: x.nombre, value: x.codigo });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectCombustible() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("tipocombustibles/", configuracion)
        .then(function (response) {
          personaArray = response.data;

          personaArray.map(function (x) {
            me.combustibles.push({ text: x.nombre, value: x.codigo });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectColores() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("colores/", configuracion)
        .then(function (response) {
          personaArray = response.data;

          personaArray.map(function (x) {
            me.colores.push({ text: x.nombre, value: x.codigo });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectAnios() {
      let me = this;
      let personaArray = [];
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("anios/", configuracion)
        .then(function (response) {
          personaArray = response.data;

          personaArray.map(function (x) {
            me.anios.push({ text: x.nombre, value: x.codigo });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    buscarCodigo() {
      let me = this;
      me.errorArticulo = null;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("articulo/queryCodigo?codigo=" + this.codigo, configuracion)
        .then(function (response) {
          me.agregarDetalle(response.data);
        })
        .catch(function (error) {
          me.errorArticulo = "No existe el artículo.";
        });
    },
    agregarDetalle(data) {
      this.errorArticulo = null;
      if (this.encuentra(data._id) == true) {
        this.errorArticulo = "El artículo ya ha sido agregado.";
      } else {
        this.detalles.push({
          _id: data._id,
          articulo: data.nombre,
          cantidad: 1,
          precio: data.precio_venta,
          descuento: 0,
        });
        this.codigo = "";
      }
    },
    encuentra(id) {
      let sw = 0;
      for (var i = 0; i < this.detalles.length; i++) {
        if (this.detalles[i]._id == id) {
          sw = true;
        }
      }
      return sw;
    },
    eliminarDetalle(arr, item) {
      let i = arr.indexOf(item);
      if (i != -1) {
        arr.splice(i, 1);
      }
    },
    listarArticulos() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("articulo/list?valor=" + this.texto, configuracion)
        .then(function (response) {
          me.articulos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    mostrarModalArticulos() {
      this.dialog = 1;
    },
    listarDetalles(id) {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("venta/query?_id=" + id, configuracion)
        .then(function (response) {
          me.detalles = response.data.detalles;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    verIngreso(item) {
      this.limpiar();
      this.tipo_comprobante = item.tipo_comprobante;
      this.serie_comprobante = item.serie_comprobante;
      this.num_comprobante = item.num_comprobante;
      this.persona = item.persona._id;
      this.impuesto = item.impuesto;
      this.listarDetalles(item._id);
      this.verNuevo = 1;
      this.verDetalle = 1;
    },
    listar() {
    //  console.log( Cliente.methods.listar())

      let me = this;
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("vehiculos/", configuracion)
        .then(function (response) {
          me.vehiculo= response.data;
          console.log(vehiculos)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    limpiar() {
      this.cliente='';
           this.marca='';
            this.modelo='';
            this.transmicion='';
            this.combustible='';
            this.traccion='';
            this.color='';
            this.anio='';
            this.chapa='';
           this.chasis='';
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.persona) {
        this.validaMensaje.push("Seleccione un cliente.");
      }
      if (!this.tipo_comprobante) {
        this.validaMensaje.push("Seleccione un tipo de comprobante.");
      }
      if (!this.num_comprobante) {
        this.validaMensaje.push("Ingrese el número del comprobante.");
      }
      if (!this.impuesto || this.impuesto < 0 || this.impuesto > 1) {
        this.validaMensaje.push("Ingrese un impuesto válido.");
      }
      if (this.detalles.length <= 0) {
        this.validaMensaje.push("Ingrese al menos un artículo al detalle");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    mostrarNuevo() {
      this.verNuevo = 1;
    },
    ocultarNuevo() {
      this.verNuevo = 0;
      this.limpiar();
    },
    editItem(item) {
      this.CodigoProducto = item.CodigoProducto;
      this.CodigoBarra = item.CodigoBarra;
      this.Descripcion = item.Descripcion;
      this.PrecioCompra = item.PrecioCompra;
      this.PrecioVentaMinorista = item.PrecioVentaMinorista;
      this.StockActual = item.StockActual;
      this.StockMinimo = item.StockMinimo;
      this.Marca = item.Marca;
      this.Categoria = item.Categoria;
      this.Impuesto = item.Impuesto;
      this.Deposito = item.Deposito;
      this.dialog = true;
      this.editedIndex = 1;
    },
    guardar() {
      let me = this;
      let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      console.log(this.transmicion);

      axios
        .post(
          "vehiculos/",
          {
            cliente:this.cliente,
            marca: this.marca,
            modelo: this.modelo,
           transmicion: this.transmicion,
            combustible: this.combustible,
            traccion: this.traccion,
            color: this.color,
            anio: this.anio,
            chapa:this.chapa,
            chasis: this.chasis
          },
          configuracion
        )
        .then(function (response) {
          me.ocultarNuevo();
          me.listar();
          me.dialogoConfirmacion = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.num_comprobante;
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
    activar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("venta/activate", { _id: this.adId }, configuracion)
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("venta/deactivate", { _id: this.adId }, configuracion)
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
