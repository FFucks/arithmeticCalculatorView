<template>
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-flex>
        <v-btn 
        depressed
        color='blue-grey'
        class='white--text mb-16'
        @click='signout()'
        >
          Sign out
        </v-btn>
        <v-card class="mx-auto" max-width="800">
        <v-tabs
          fixed-tabs
          background-color="blue"
          dark
          v-model='tab'
        >
          <v-tab name='operation'>
            Operation
          </v-tab>
          <v-tab name='records'>
            Records
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model='tab'>
          <v-tab-item>
            <OperationComponent/>
          </v-tab-item>
          <v-tab-item>
            <RecordsComponent/>
          </v-tab-item>
        </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OperationComponent from '@/components/OperationComponent.vue'
import RecordsComponent from '@/components/RecordsComponent.vue'
import { mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    OperationComponent,
    RecordsComponent
  },
  data() {
    return {
      tab:null
    }
  },
  methods: {
    ...mapActions(['fetchRecords']),
    signout() {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("userBalance");
      localStorage.removeItem("userId");
      this.$router.push('/login');
    }
  },
  watch: {
    tab() {
      if (this.tab == '1') {
        this.fetchRecords();
      }
    }
  }
}
</script>
