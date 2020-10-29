<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Registrar Repuestos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
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
        <v-dialog v-model="dialog" max-width="1200px">
          <template v-slot:activator="{ on }">
            <v-btn color="amber darken-4" dark class="mb-2" v-on="on">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md2>
                    <template v-if="editedIndex==-1">
                      <v-text-field v-model="code" label="C. del Producto"></v-text-field>
                    </template>
                    <template v-if="editedIndex>-1">
                      <v-text-field v-model="CodigoProducto" label="C. del Producto"></v-text-field>
                    </template>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="CodigoBarra" label="Codigo de Barra"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field v-model="Descripcion" label="Descripcion"></v-text-field>
                  </v-flex>
                </v-layout>
                <!--  -->
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <v-autocomplete
                      :items="Depositos"
                      v-model="Deposito"
                      item-value="Deposito"
                      label="Deposito"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md2>
                    <v-text-field v-model="PrecioCompra" label="Precio de Compra"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md2>
                    <v-text-field v-model="PrecioVentaMinorista" label="Precio de Venta"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md2>
                    <v-text-field v-model="StockActual" label="Stock Actual"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md2>
                    <v-text-field v-model="StockMinimo" label="Stock Minimo"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-autocomplete
                      :items="Marcas"
                      v-model="Marca"
                      item-value="Marca"
                      label="Marca"
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-autocomplete
                      :items="Categorias"
                      v-model="Categoria"
                      item-value="Categoria"
                      label="Categoria"
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-autocomplete
                      :items="Impuestos"
                      v-model="Impuesto"
                      item-value="Impuesto"
                      label="Impuesto"
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
                <v-flex xs12 sm12 md12 v-show="valida">
                  <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                </v-flex>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mb-2" dark color="red accent-3" @click="close">
                Cancelar
                <v-icon dark right>mdi-cancel</v-icon>
              </v-btn>
              <v-btn color="green darken-3" class="mb-2" dark @click="guardar">
                Guardar
                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- dialogo confirmacion -->
        <template>
          <v-dialog v-model="dialogoConfirmacion" persistent max-width="400">
            <v-card dark color="blue lighten-3">
              <v-card-title class="headline">
                <v-img
                  class="white--text align-end"
                  :src="require('../../assets/ok.png')"
                  contain
                  height="100"
                ></v-img>
              </v-card-title>
              <center>
                <v-card-text>
                  <h3 class="white--text align-end">Tansaccion Correcta</h3>
                </v-card-text>
              </center>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" text @click="dialogoConfirmacion = false">Aceptar</v-btn>
                <!-- <v-btn color="red " text @click="listarprecio(item)">Agregar Lista de Precio?</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <!-- fin dialogo -->
      </v-toolbar>
      <v-data-table :headers="headers" :items="productos" :search="search" class="elevation-1">
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
          <td>{{ props.item.CodigoProducto }}</td>
          <td>{{ props.item.CodigoBarra }}</td>
          <td>{{ props.item.Descripcion }}</td>
          <td>{{ props.item.PrecioCompra }}</td>
          <td>{{props.item.PrecioVentaMinorista}}</td>
          <td>{{ props.item.StockActual }}</td>
          <td>{{ props.item.StockMinimo }}</td>
          <td>{{ props.item.Marca}}</td>
          <td>{{ props.item.Categoria}}</td>
          <td>{{ props.item.Impuesto}}</td>
          <td>{{ props.item.Deposito}}</td>

          <td></td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
    <!-- Dialogo para guardar o imprimir informe -->
    <v-dialog v-model="dialogo_reporte" max-width="500px">
      <v-card>
        <v-card-title>Opciones de reportes</v-card-title>
          <v-card-text>
            <v-autocomplete
              :items="Categorias"
              v-model="CodigoCategoria"
              item-value="CodigoCategoria"
              label="Categoria"
            >
            </v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" dark @click='generarInforme()'>Ver informe</v-btn>
            <v-btn color="primary" dark @click='Imprimir_reporte()'>Imprimir</v-btn>
            <v-btn color="primary" text @click="dialogo_reporte = false"> Cancelar</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import axios from "axios";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import printJS from 'print-js';
import Listaprecio from "../producto/Listaprecio";
import { create } from "domain";
export default {
  data() {
    return {
      dialog: false,
      dialogoConfirmacion: false,
      dialogo_reporte: false,
      search: "",
      code: "",
      productos: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Codigo", value: "CodigoProducto", sortable: true },
        { text: "C. de Barra", value: "CodigoBarra", sortable: false },
        { text: "Descripcion", value: "Descripcion", sortable: false },
        { text: "Precio Compra", value: "PrecioCompra", sortable: false },
        {
          text: "Precio Venta",
          value: "PrecioVentaMinorista",
          sortable: false
        },
        { text: "Stock Actual", value: "StockActual", sortable: false },
        { text: "Stock Minimo", value: "StockMinimo", sortable: false },
        { text: "Marca", value: "Marca.Descripcion", sortable: false },
        { text: "Categoria", value: "Categoria", sortable: false },
        { text: "Impuesto", value: "Impuesto", sortable: false },
        { text: "Deposito", value: "Deposito", sortable: false }
      ],
      Marcas: [],
      Categorias: [],
      Depositos: [],
      Impuestos: [],
      editedIndex: -1,
      CodigoProducto: "",
      CodigoBarra: "",
      Descripcion: "",
      PrecioCompra: "",
      PrecioVentaMinorista: "",
      StockMinimo: "",
      StockActual: "",
      Marca: "",
      Categoria: "",
      Impuesto: "",
      Deposito: "",
      valida:'',
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
      valida:'',
      CodigoCategoria: '',
    };
  },
  computed: {
    formTitle() {
      // this.limpiar();
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.listar();
    this.cod();
    this.selectMarcas();
    this.selectCategoria();
    this.selectDeposito();
    this.selectImpuesto();
  },
  methods: {
    generarInforme(){
      let list_productos = [];
      if(this.CodigoCategoria) {
        const producto_F = this.productos.filter(pro => pro.Categoria == this.CodigoCategoria);
        list_productos = producto_F;
      }else{
        list_productos = productos;
      }
      var columns = [
        {title: 'Código', dataKey:'codigo'},
        {title: 'Producto', dataKey:'descripcion'},
        {title: 'Precio de compra', dataKey:'precio_compra'},
        {title: 'Precio de venta', dataKey:'precio_venta'},
        {title: 'Stack actual', dataKey:'stock_actual'},
        {title: 'Stock minimo', dataKey:'stockm_inimo'},
        // {title: 'Marca', datakey:'marca'},
        // {title: '', datakey:''},
        // {title: '', datakey:''},
        // {title: '', datakey:''},
        // {title: '', datakey:''},
        // {title: '', datakey:''},
      ];
      var rows = [];
      list_productos.map(function(producto){
        console.log("Marca: ", producto.Descripcion);
        rows.push({
          codigo: producto.CodigoBarra,
          descripcion: producto.Descripcion,
          precio_compra: producto.PrecioCompra,
          precio_venta: producto.PrecioVenta,
          stock_actual: producto.StockActual,
          stockm_inimo: producto.StockMinimo,
          // marca: producto.marca.Descripcion,
        });
      });

      var doc = new jsPDF('l', 'pt');
      doc.autoTable(columns, rows, {
        margin: {top:60},
        addPageContent: function(data){
          doc.text("Lista de Productos", 40, 30);
          // doc.text(this.Categoria);
        },
        // printHeader: true,
      });
      // if(print){
        doc.output('dataurlnewwindow');
      // }else{
      //   doc.save("informe_productos.pdf");
      // }
      
      this.dialogo_reporte = false;
    },
    selectMarcas() {
      let me = this;
      let marcaArray = [];
      let header={"auth-token":this.$store.state.token}
      let configuracion = { headers: header };
      axios
        .get("marcas/", configuracion)
        .then(function(response) {
          marcaArray = response.data;
          //    console.log(marcaArray)
          marcaArray.map(function(x) {
            me.Marcas.push({ text: x.Descripcion, value: x.CodigoMarca });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectCategoria() {
      let me = this;
      let categoriaArray = [];
      let header={"auth-token":this.$store.state.token};
      let configuracion = { headers: header };
      axios
        .get("categorias/", configuracion)
        .then(function(response) {
          categoriaArray = response.data;
          // console.log(categoriaArray)
          categoriaArray.map(function(x) {
            me.Categorias.push({
              text: x.Descripcion,
              value: x.CodigoCategoria
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectDeposito() {
      let me = this;
      let depositoArray = [];
      let header={"auth-token":this.$store.state.token};
      let configuracion = { headers: header };
      axios
        .get("depositos/", configuracion)
        .then(function(response) {
          depositoArray = response.data;
          //console.log(depositoArray)
          depositoArray.map(function(x) {
            me.Depositos.push({ text: x.Nombre, value: x.codigoDeposito });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectImpuesto() {
      let me = this;
      let impuestoArray = [];
      let header={"auth-token":this.$store.state.token};
      let configuracion = { headers: header };
      axios
        .get("impuestos/", configuracion)
        .then(function(response) {
          impuestoArray = response.data;
          // console.log(categoriaArray)
          impuestoArray.map(function(x) {
            me.Impuestos.push({ text: x.Descripcion, value: x.CodigImpuesto });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listar() {
       let header={"auth-token":this.$store.state.token};
      let configuracion = { headers: header };
      let me = this;
      axios
        .get("productos/listar",configuracion)
        .then(function(response) {
          console.log(response.data);
          me.productos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cod() {
      let header={"auth-token":this.$store.state.token}
      let configuracion = { headers: header };
      let me = this;
      axios
        .get("productos/codigo",configuracion)
        .then(function(response) {
          me.code = response.data;
          //  this.CodigoProducto=me.code;
          console.log(me.code);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this.Descripcion = "";
      this.Marca = "";
      this.Impuesto = "";
      this.CodigoProducto = "";
      this.CodigoBarra = "";
      this.Deposito = "";
      this.PrecioCompra = "";
      this.Categoria = "";
      this.StockActual = "";
      this.StockMinimo = "";
      this.PrecioVentaMinorista = "";
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.Descripcion.length < 1 || this.Descripcion.length > 500) {
        this.validaMensaje.push(
          "La descripcion de la unidad debe tener entre 1-50 caracteres."
        );
      }
      if (this.CodigoBarra.length < 1) {
        this.validaMensaje.push("Ingrese el codigo de barras.");
      }
      if (this.Deposito.length < 1) {
        this.validaMensaje.push("Ingrese el Deposito.");
      }
      if (this.PrecioCompra.length < 1) {
        this.validaMensaje.push("Ingrese el Precio de Compra.");
      }
      if (this.PrecioVentaMinorista.length < 1) {
        this.validaMensaje.push("Ingrese el Precio de Venta.");
      }
      if (this.StockActual.length < 1) {
        this.validaMensaje.push("Ingrese el Stock Actual.");
      }
      if (this.StockMinimo.length < 1) {
        this.validaMensaje.push("Ingrese el Stock Minimo.");
      }
      if (this.Marca.length < 1) {
        this.validaMensaje.push("Ingrese la Marca.");
      }
      if (this.Categoria.length < 1) {
        this.validaMensaje.push("Ingrese la Categoria.");
      }
      if (this.Impuesto.length < 1) {
        this.validaMensaje.push("Ingrese el Impuesto.");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      let me = this;
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //Código para editar
         let header={"auth-token":this.$store.state.token}
         let configuracion = { headers: header };
        console.log(this.editedIndex);
        axios
          .put("productos/update", {
            CodigoProducto: this.CodigoProducto,
            CodigoBarra: this.CodigoBarra,
            Descripcion: this.Descripcion,
            Marca: this.Marca,
            Categoria: this.Categoria,
            Impuesto: this.Impuesto,
            Deposito: this.Deposito,
            StockActual: this.StockActual,
            StockMinimo: this.StockMinimo,
            PrecioCompra: this.PrecioCompra,
            PrecioVentaMinorista: this.PrecioVentaMinorista
          },configuracion)
          .then(function(response) {
            me.close();
            me.listar();
            me.limpiar();
            me.cod();
            me.dialogoConfirmacion = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log(this.code);
        let header={"auth-token":this.$store.state.token}
        let configuracion = { headers: header };
        axios
          .post("productos/add", {
            CodigoProducto: this.code,
            CodigoBarra: this.CodigoBarra,
            Descripcion: this.Descripcion,
            Marca: this.Marca,
            Categoria: this.Categoria,
            Impuesto: this.Impuesto,
            Deposito: this.Deposito,
            StockActual: this.StockActual,
            StockMinimo: this.StockMinimo,
            PrecioCompra: this.PrecioCompra,
            PrecioVentaMinorista: this.PrecioVentaMinorista
          },configuracion)
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
            me.cod();
            me.dialogoConfirmacion = true;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
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
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.Descripcion;
      this.adPrecioCompra = item.PrecioCompra;
      this.adStock = item.StockActual;
      this.adId = item.CodigoProducto;
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
      axios
        .put("impuestos/", { CodigImpuesto: this.adId })
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adSimbolo = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      axios
        .put("impuestos/deactivate", { _id: this.adId })
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.limpiar();
      this.dialog = false;
    },
    listarprecio(item) {
      this.$router.push({
        name: "listaprecio",
        params: {
          id: item.CodigoProducto,
          descripcion: item.Descripcion,
          deposito: item.Deposito
        }
      });
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.Descripcion.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textOne.indexOf(searchText) > -1
      );
    },
    Imprimir_reporte(){
      const producto_F = this.productos.filter(pro => pro.Categoria == this.CodigoCategoria);
      // console.log(producto_F);
      printJS({printable: producto_F, properties: ['CodigoProducto', 'CodigoBarra', 'Descripcion'], type: 'json'})
    },
  }
};
</script>
