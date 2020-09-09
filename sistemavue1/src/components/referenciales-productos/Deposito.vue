<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Deposito</v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search"
                              label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="Descripcion" label="Descripción"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <!--  -->
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="Porcentaje" label="Porcentaje"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <!--  -->
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="DividirPor" label="Dividir"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="impuestos"
                    :search="search"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                    </td>
                    <td>{{ props.item.CodigImpuesto }}</td>
                    <td>{{ props.item.Descripcion }}</td>
                    <td>{{ props.item.Porcentaje }}</td>
                    <td>{{ props.item.DividirPor }}</td>
                    <td>
                    </td>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="listar()">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                dialog: false,
                search:'',
                impuestos:[],
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Codigo', value: 'CodigImpuesto', sortable: true },
                    { text: 'Descripción', value: 'Descripcion', sortable: false },
                    { text: 'Porcentaje', value: 'Porcentaje', sortable: false },
                    { text: 'Dividir', value: 'DividirPor', sortable: false },

                ],
                editedIndex: -1,
                CodigImpuesto:'',
                Descripcion:'',
                Porcentaje:'',
                DividirPor:'',
                validaMensaje:[],
                adModal:0,
                adAccion:0,
                adNombre:'',
                adId:''
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created () {
            this.listar()
        },
        methods: {
            listar(){
                let me=this;
                axios.get('impuestos/').then(function (response){
                    me.impuestos=response.data;
                }).catch(function(error){
                    console.log(error);
                });

            },
            limpiar(){
                this.Descripcion='';
                this.Porcentaje='';
                this.DividirPor='';
                this.editedIndex=-1;
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];
                if(this.Descripcion.length<1 || this.Descripcion.length>50){
                    this.validaMensaje.push('La descripcion de la unidad debe tener entre 1-50 caracteres.');
                }
                if(this.Porcentaje.length>255){
                    this.validaMensaje.push('El simbolo de la unodad no debe tener más de 255 caracteres.');
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            guardar(){
                let me=this;
                if (this.validar()){
                    return;
                }
                if (this.editedIndex >-1){
                    //Código para editar
                    console.log(this.CodigImpuesto,this.Descripcion,this.Porcentaje)
                    axios.put('impuestos/',{'CodigImpuesto':this.CodigImpuesto,'Descripcion':this.Descripcion,'Porcentaje':this.Porcentaje,'DividirPor':this.DividirPor})
                        .then(function(response){
                            me.limpiar();
                            me.close();
                            me.listar();
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                }else{
                    console.log(this.CodigImpuesto,this.Descripcion,this.Porcentaje)
                    axios.post('impuestos/',{'Descripcion':this.Descripcion,'Porcentaje':this.Porcentaje,'DividirPor':this.DividirPor})
                        .then(function(response){
                            me.limpiar();
                            me.close();
                            me.listar();
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                }
            },
            editItem (item) {
                this.CodigImpuesto=item.CodigImpuesto;
                this.Descripcion=item.Descripcion;
                this.Porcentaje=item.Porcentaje;
                this.DividirPor= item.DividirPor;
                this.dialog = true;
                this.editedIndex=1;
            },
            activarDesactivarMostrar(accion,item){
                this.adModal=1;
                this.adNombre=item.Descripcion;
                this.adPorentaje = item.Porcentaje;
                this.adDividir = item.DividirPor;
                this.adId=item.CodigImpuesto;
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
                axios.put('impuestos/',{'CodigImpuesto':this.adId})
                    .then(function(response){
                        me.adModal=0;
                        me.adAccion=0;
                        me.adNombre='';
                        me.adSimbolo='';
                        me.adId='';
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
            desactivar(){
                let me=this;
                axios.put('impuestos/deactivate',{'_id':this.adId})
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
            }
        }
    }
</script>