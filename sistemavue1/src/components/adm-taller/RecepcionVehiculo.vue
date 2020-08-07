<template>
  <v-layout align-start>
    <v-flex>
      <v-card class="overflow-hidden" color="green lighten-5" fluid>
        <v-toolbar flat color="green" dark>
          <v-icon>mdi-account</v-icon>
          <v-toolbar-title>Recepcion de Vehiculos
            <v-chip color="green" label text-color="white">
              <v-icon left>mdi-label</v-icon>Sucursal
            </v-chip>
            <v-chip color="green" label text-color="white">
              <v-icon left>mdi-label</v-icon>Punto de Expedicion
            </v-chip>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing">
            <v-icon v-if="isEditing">mdi-close</v-icon>
            <v-icon v-else>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
           <v-layout>
              <v-flex xs12 sm12 md4>
            <v-chip color="pink" label text-color="white">
              <v-icon left>mdi-label</v-icon>Sucursal
            </v-chip>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-chip  color="pink" label text-color="white">
              <v-icon left>mdi-label</v-icon>Punto Expedicion
            </v-chip>
          </v-flex>
           </v-layout>

          <v-flex xs12 sm12 md12>
            <v-text-field v-model="Descripcion" label="Descripción"></v-text-field>
          </v-flex>
          <v-autocomplete
            :disabled="!isEditing"
            :items="states"
            :filter="customFilter"
            color="black"
            item-text="name"
            label="State"
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
        </v-card-actions>
        <v-snackbar
          v-model="hasSaved"
          :timeout="2000"
          absolute
          bottom
          left
        >Your profile has been updated</v-snackbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: null,
      model: null,
      states: [
        { name: "Florida", abbr: "FL", id: 1 },
        { name: "Georgia", abbr: "GA", id: 2 },
        { name: "Nebraska", abbr: "NE", id: 3 },
        { name: "California", abbr: "CA", id: 4 },
        { name: "New York", abbr: "NY", id: 5 },
      ],
    };
  },

  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
  },
};
</script>