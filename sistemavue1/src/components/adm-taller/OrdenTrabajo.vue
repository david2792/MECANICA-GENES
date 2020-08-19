<template  >
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Orden de Trabajo<v-icon>commute</v-icon></v-toolbar-title>
        <v-divider
            class="mx-2"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-if="verNuevo==0" class="text-xs-center" v-model="search" append-icon="search"
                      label="Búsqueda" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="purple darken-4" v-if="verNuevo==0" @click="mostrarNuevo()" dark class="mb-2">Nuevo<v-icon>create</v-icon></v-btn>
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
                  <h3 class="white--text align-end">REGISTRO GUARDADO</h3>
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
        <!-- dialogo para agregar recepciones -->
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione una Recepcion</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraRecepcion"
                          :items="recepciones"
                          class="elevation-10"
                          :search="texto"
                      >
                        <template v-slot:items="props">
                          <td class="justify-center layout px-0">
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                color="purple darken-4"
                                @click="agregarDetalle(props.item)"
                              >
                                <v-icon dark>
                                  save_alt</v-icon>
                              </v-btn>
                          </td>
                           <td>{{ props.item.numero }}</td>
                          <td>{{ props.item.chapa }}</td>
                          <td>{{ props.item.fechaentrada }}</td>
                          <td>{{ props.item.observaciones }}</td>
                          <td>{{ props.item.RazonSocial }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- fin del dialogo para agregar recepciones -->
        <!-- dialogo para agregar repuestos o mercaderias -->
        <v-dialog v-model="dialogrepuestos" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione una Repuesto</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraRecepcion"
                          :items="recepciones"
                          class="elevation-10"
                          :search="texto"
                      >
                        <template v-slot:items="props">
                          <td class="justify-center layout px-0">
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                color="purple darken-4"
                                @click="agregarDetalle(props.item)"
                              >
                                <v-icon dark>
                                  save_alt</v-icon>
                              </v-btn>
                          </td>
                           <td>{{ props.item.numero }}</td>
                          <td>{{ props.item.chapa }}</td>
                          <td>{{ props.item.fechaentrada }}</td>
                          <td>{{ props.item.observaciones }}</td>
                          <td>{{ props.item.RazonSocial }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- fin del dialogo para agregar repuestos -->
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="ventas"
          :search="search"
          class="elevation-24"
          v-if="verNuevo==0"
      >
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
            <v-btn  class="mx-2"
                fab
                dark
                small
                color="purple darken-4"> <v-icon @click="verIngreso(props.item)">
              settings
            </v-icon></v-btn>
           
           
          </td>
          <td >{{ props.item.numero }}</td>
          <td>{{ props.item.chapa }}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.observaciones }}</td>
          <td>{{ props.item.km }}</td>
          <td>{{ props.item.nivel }}</td>
          <td>{{ props.item.fechaentrada }}</td>
         <td> {{ props.item.estadorecepcion }} </td>
         
         
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
        <v-layout row wrap>

          <v-flex xs12 sm2 md2 lg1 xl1 class=" pr-auto">
            <v-btn small fab dark color="teal" @click="mostrarModalArticulos()">
              <v-icon dark>add</v-icon>
            </v-btn>
            Buscar
          </v-flex>
          <v-flex xs12 sm8 md8 lg10 xl10>
          <v-text-field v-model="observacion" label="Observaciones de la recepcion ">
            </v-text-field>
          </v-flex>

           <v-flex xs2 sm2 md2 lg2 xl2>
            <v-text-field v-model="codigorecepcion" label="Codigo Recepcion ">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 lg4 xl4>
            <v-text-field v-model="chapa" label="Numero de Chapa ">
            </v-text-field>
          </v-flex>
          <!--  -->

           
           <!--  -->
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
                      :items="ordenes"
                      v-model="orden"
                      item-value="value"
                      label="Estado del Orden de Trabajo"
                    ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg10 xl10>
           <v-autocomplete
                      :items="mecanicos"
                      v-model="mecanico"
                     item-value="descripcion" 
                      label="Mecanico a Cargo"
                    ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg10 xl10>
            <v-text-field v-model="km" label="Repuestos a Utilizar">
            </v-text-field>
          </v-flex>

           <v-flex xs12 sm2 md2 lg2 xl2>
            <v-btn small fab dark color="teal" @click="mostrarModalRepuestos()">
              <v-icon dark>list</v-icon>
            </v-btn>
          </v-flex>

         <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="observacion" label="Stock Actual">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="observacion" label="Cantidad">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="observacion" label="Precio">
            </v-text-field>
          </v-flex>

          
          <v-flex xs12 sm2 md2 lg2 xl2>
            <v-btn small fab dark color="pink accent-4" @click="agregarTabla()">
              <v-icon>
                  playlist_add</v-icon>
            </v-btn>
          </v-flex>

         <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="observacion" label="Impuesto">
            </v-text-field>
          </v-flex>

          
        
          <v-flex xs12 sm12 md12 lg12 xl2 v-show="errorArticulo">
            <div class="red--text" v-text="errorArticulo">

            </div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <template>
              <v-data-table
                  :headers="cabeceraDetalles"
                  :items="detalles"
                  hide-actions
                  class="elevation-1"
              >
                <template slot="items" slot-scope="props">
              <td>
                 
             <v-btn  class="mx-2"
                fab
                dark
                small
                color="purple darken-4"> <v-icon   @click="eliminarDetalle(detalles,props.item)">
              delete
            </v-icon></v-btn>
                  </td>
                  <td class="text-xs-center">{{ props.item.Codigo}}</td>
                  <td class="text-xs-center"><v-text-field v-model="props.item.chapa" type="text"></v-text-field></td>
                  <td class="text-xs-center"><v-text-field v-model="props.item.km" type="text"></v-text-field></td>
                  <td class="text-xs-center" ><v-text-field v-model="props.item.nivelcombustible" type="text"></v-text-field></td>
                   <td class="text-xs-center" v-if="2==3" ><v-text-field v-model="props.item.codigonivel" type="text"></v-text-field></td>
                  <!-- <td class="text-xs-right">$ {{ (props.item.cantidad * props.item.precio)-props.item.descuento}}</td> -->
                </template>
                <template slot="no-data">
                  <h3>No hay artículos agregados al detalle.</h3>
                </template>
              </v-data-table>
            </template>
          </v-flex>
          <v-flex xs12 sm12 md12 v-show="valida">
            <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
            </div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="deep-purple darken-3" dark  @click.native="ocultarNuevo()">Cancelar<v-icon>clear</v-icon></v-btn>
            <v-btn color="red " dark v-if="verDetalle==0" @click.native="guardar()">Guardar<v-icon>save</v-icon></v-btn>
          </v-flex>
      
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      dialog: false,
      dialogrepuestos:false,
      search:'',
      ventas:[],
      recepcion:'',
      codigorecepcion:'',
      ordenes:[],
      orden:'',
      mecanico:'',
      mecanicos:[],
      headers: [
        
        { text: 'Opciones', value: 'opciones', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'Nro', value: 'numero', sortable: true, class: "cabecera colorCabecera--text" },
        { text: 'CHAPA  ', value: 'chapa', sortable: true,class: "cabecera colorCabecera--text",},
        { text: 'CLIENTE', value: 'RazonSocial', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'OBSERVACION', value: 'observaciones', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'KM', value: 'km', sortable: false,class: "cabecera colorCabecera--text"  },
         { text: 'NIVEL COMBUSTIBLE', value: 'nivel', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'FECHA ENTRADA', value: 'fechaentrada', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'ESTADO RECEPCION', value: 'estadorecepcion', sortable: false,class: "cabecera colorCabecera--text"  },
        // { text: 'Estado', value: 'estado', sortable: false  }
      ],
      _id:'',
      // codigonivel:'',
       dialogoConfirmacion: false,
      persona:'',
      personas:[],
      CodigoSucursal:'',
      estadorecepciones:[],
      estadorecepcion:'',
      chapa:'',
      nivelcombustible:'',
      km:'',
      observacion:'',
      nivelcombustibles:[],
      tipo_comprobante:'',
      comprobantes: ['BOLETA','FACTURA','TICKET','GUIA'],
      serie_comprobante:'',
      num_comprobante: '',
      impuesto: 0.18,
      codigo:'',
      Codigo:'',
      cliente:'',
      clientes:[],
      cabeceraDetalles:[
        { text: 'Borrar', value: 'borrar', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'Codigo Vehiculo', value: 'Codigo', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'Chapa', value: 'Chapa', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'km de Entrada', value: 'km', sortable: false ,class: "cabecera colorCabecera--text" },
        { text: 'Nivel Combustible', value: 'nivelcombustible', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'cod nivel', value: 'codigonivel', sortable: false, align: ' d-none'},
        // { text: 'Descuento', value: 'descuento', sortable: false },
        // { text: 'Sub Total', value: 'subtotal', sortable: false  }
      ],
      detalles:[],
      verNuevo:0,
      errorArticulo:null,
      total:0,
      totalParcial:0,
      totalImpuesto:0,
      recepciones:[],
      texto:'',
      cabeceraRecepcion: [
        { text: 'Seleccionar', value: 'seleccionar', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'CODIGO',value: 'numero', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'CHAPA',value: 'chapa', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'FECHA ENTRADA',value: 'fechaentrada', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'OBSERVACION',value: 'observaciones', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'CLIENTE',value: 'RazonSocial', sortable: true,class: "cabecera colorCabecera--text" },
        // { text: 'Estado', value: 'estado', sortable: false }
      ],
      verDetalle:0,
      valida:0,
      validaMensaje:[],
      adModal:0,
      adAccion:0,
      adNombre:'',
      adId:''
    }
  },
  computed: {
    calcularTotal: function(){
      let resultado=0.0;
      for(var i=0;i<this.detalles.length;i++){
        resultado=resultado+((this.detalles[i].cantidad*this.detalles[i].precio)-this.detalles[i].descuento);
      }
      return resultado;
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogrepuestos(val){
      val || this.close()
    }
  },
  created () {
     this.listar();
     this.selecOrden();
     this.selectMecanico();
     this.selectEstado();
     this.selectNivel();
  
    //  this.capturarcodigo();
   // this.listarArticulos()
  },
  methods: {
    selecOrden(){
      let me=this;
      let ordenArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('estadotrabajos/',configuracion).then(function (response){
        ordenArray=response.data;
        ordenArray.map(function(x){
          me.ordenes.push({text:x.codigo +" "+x.descripcion, value:x.CodigoCliente});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    selectMecanico(){
      let me=this;
      let mecanicoArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('clientes/mecanico/',configuracion).then(function (response){
        mecanicoArray=response.data;
        console.log(mecanicoArray)
        mecanicoArray.map(function(x){
          me.mecanicos.push({text:x.CodigoUsuario +" "+x.Nombre+" "+x.Apellido, value:x.CodigoUsuario});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
     selectEstado(){
      let me=this;
      let personaArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('estadorecepciones/',configuracion).then(function (response){
        personaArray=response.data;
        personaArray.map(function(x){
          me.estadorecepciones.push({text:x.descripcion,value:x.codigo});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    capturarcodigo(texto){
       const cod = texto.split(' ')[0]
       return cod
    }
    ,
    selectNivel(){
      let me=this;
      let personaArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('nivelcombustibles/',configuracion).then(function (response){
        personaArray=response.data;
        personaArray.map(function(x){
          me.nivelcombustibles.push({text:x.codigo+" "+x.descripcion,value:x.codigo});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    buscarCodigo(){
      let me=this;
      // let header={"auth-token" : this.$store.state.token};
      // let configuracion= {headers : header};
       let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      let cliente = this.cliente;
      console.log(cliente)
      axios.get('rvehiculo/'+cliente,configuracion).then(function (response){
        console.log((response.data))
     //   me.agregarDetalle(response.data);
      }).catch(function(error){
        me.errorArticulo='No existe el artículo.';
      });

    },
    // se agrega el datalle a la tabla
    agregarDetalle(data){
      this.errorArticulo=null;
      if (this.encuentra(data.chapa)==true){
        this.errorArticulo='La recepcion ya ha sido agregada.';
      }
      else{
       console.log( data.chapa)
        this.codigorecepcion= data.numero;
        this.chapa=data.chapa;
        this.observacion=data.observaciones
        // this.detalles.push(
        //     {

        //       // chapa:data.chapa,
        //       // articulo:data.marca,
        //       // cantidad:1,
        //       // precio:data.precio_venta,
        //       // descuento:0
        //     }
        // );
        this.codigo='';
      }
      this.close();
    },
     agregarTabla(){
       const codigonivel = this.capturarcodigo(this.nivelcombustible)
        this.detalles.push(
            {
              
              Codigo:this.Codigo,
              chapa:this.chapa,
              km:this.km,
              nivelcombustible:this.nivelcombustible,
              codigonivel:codigonivel
             
             // chapa:this.chapa,
              
            }
        );
      
    },
    encuentra(chapa){
      let sw=0;
      for (var i=0;i<this.detalles.length;i++){
        if(this.detalles[i].chapa==chapa){
          sw=true;
        }
      }
      return sw;
    },
    eliminarDetalle(arr,item){
      let i=arr.indexOf(item);
      if (i!= -1){
        arr.splice(i,1);
      }
    },
    listarRecepcion(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/recepcion',configuracion).then(function (response){
        me.recepciones=response.data;
        console.log(me.recepciones)
      }).catch(function(error){
        console.log(error);
      });
    },
    mostrarModalArticulos(){
      this.dialog=1;
      this.listarRecepcion();
    },
    mostrarModalRepuestos(){
        console.log("repuesto")
        this.dialogrepuestos=1;
    },
    listarDetalles(){
      console.log("cliente 2")
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      console.log("hola")
      cliente:this.cliente;
      console.log(cliente)
       axios.get('rvehiculo/'+cliente,configuracion).then(function (response){
        me.detalles=response.data.detalles;
      }).catch(function(error){
        console.log(error);
      });
    },
    verIngreso(item){
      console.log("cliente3")
      this.limpiar();
      this.tipo_comprobante=item.tipo_comprobante;
      this.serie_comprobante=item.serie_comprobante;
      this.num_comprobante=item.num_comprobante;
      this.persona=item.persona._id;
      this.impuesto=item.impuesto;
      this.listarDetalles();
      this.verNuevo=1;
      this.verDetalle=1;
    },
    listar(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/recepcion/',configuracion).then(function (response){
        me.ventas=response.data;
        console.log(me.ventas)
      }).catch(function(error){
        console.log(error);
      });

    },
    limpiar(){
      this.Codigo='';
      this.observacion='';
      this.cliente='';
      this.nivelcombustible='';
      this.estadorecepcion='';
      this.chapa='';
      this.km='';
      this.detalles=[];
      this.validaMensaje=[];
      this.verDetalle=0;
    },
    validar(){
      this.valida=0;
      this.validaMensaje=[];
      if(!this.persona){
        this.validaMensaje.push('Seleccione un cliente.');
      }
      if(!this.tipo_comprobante){
        this.validaMensaje.push('Seleccione un tipo de comprobante.');
      }
      if(!this.num_comprobante){
        this.validaMensaje.push('Ingrese el número del comprobante.');
      }
      if(!this.impuesto || this.impuesto<0 || this.impuesto>1){
        this.validaMensaje.push('Ingrese un impuesto válido.');
      }
      if(this.detalles.length<=0){
        this.validaMensaje.push('Ingrese al menos un artículo al detalle');
      }
      if (this.validaMensaje.length){
        this.valida=1;
      }
      return this.valida;
    },
    mostrarNuevo(){
      this.verNuevo=1;
    },
    ocultarNuevo(){
      this.verNuevo=0;
      this.limpiar();
    },
    guardar(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      console.log(this.$store.state.usuario)         
      axios.post('rvehiculo/',
          {
            'CodigoSucursal':this.$store.state.usuario.CodigoSucursal,
            'PuntoExpedicion':this.$store.state.usuario.PuntoExpedicion,
            'recibidopor':this.$store.state.usuario.codigo,
            'codigocliente':this.cliente,
            'estado':this.estadorecepcion,
            'observaciones':this.observacion,
            'detalles':this.detalles
          },configuracion)
          .then(function(response){
            me.dialogoConfirmacion = true;
            me.limpiar();
            me.close();
            me.listar();
            me.ocultarNuevo();
          })
          .catch(function(error){
            console.log(error);
          });
    },
    activarDesactivarMostrar(accion,item){
      this.adModal=1;
      this.adNombre=item.num_comprobante;
      this.adId=item._id;
      if (accion==1){
        this.adAccion=1;
      } else if(accion==2){
        this.adAccion=2;
      } else{
        this.adModal=0;
      }
    },
    activarDesactivarCerrar(){
      this.adModal=0;
    },
    activar(){
      let me=this;
      let header={"Token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.put('venta/activate',{'_id':this.adId},configuracion)
          .then(function(response){
            me.adModal=0;
            me.adAccion=0;
            me.adNombre='';
            me.adId='';
            me.listar();
          })
          .catch(function(error){
            console.log(error);
          });
    },
    desactivar(){
      let me=this;
      let header={"Token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.put('venta/deactivate',{'_id':this.adId},configuracion)
          .then(function(response){
            me.adModal=0;
            me.adAccion=0;
            me.adNombre='';
            me.adId='';
            me.listar();
          })
          .catch(function(error){
            console.log(error);
          });
    },
    close () {
      this.dialog = false;
      ths.dialogrepuestos=false;
    }
  }
}
</script>

<style>
v-layout{ 
   border-style: solid;
   border-color: red}
</style>