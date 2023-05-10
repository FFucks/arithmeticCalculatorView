<template>
  <v-container class="pa-0">
    <v-card-text>
      <v-text-field 
        v-model='search'
        label="Search"
        outlined
        prepend-inner-icon='mdi-magnify'
        >
      </v-text-field>
      <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="name"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:[`item.action`]='{item}'>
          <v-btn
            block
            depressed
            class="white--text"
            color="red"
            @click='remove(item.id)'
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        
        <template v-slot:[`item.date`]='{item}'>
          {{item.date | toDateTime}}
        </template>

      </v-data-table>
    </v-card-text>
  </v-container>
</template>

<script>
import api from '@/services/api.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'OperationComponent',

  data: () => ({
    headers: [
        {
          text: 'Record Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Amount', value: 'amount' },
        { text: 'User Balance', value: 'userBalance' },
        { text: 'Result of Operation', value: 'operationResponse' },
        { text: 'Date', value: 'date' },
        { text: 'Type', value: 'type' },
        { text: 'Actions', value: 'action'}
      ],
    search: null
  }),
  computed: {
    ...mapGetters({
      desserts: 'getdesserts'
    })
  },
  methods: {
    ...mapActions(['fetchRecords']),
    remove(id) {
      console.log(id);
      api.delete(`/record/${id}`).then(() => {
        this.fetchRecords();
      });
    }
  }
  
}
</script>
