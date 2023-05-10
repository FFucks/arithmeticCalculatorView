<template>
  <v-container class="pa-0">
    <v-card-text>
      <v-radio-group
        v-model="option"
        row
      >
        <v-radio
          label="addition"
          value="addition"
        ></v-radio>
        <v-radio
          label="subtraction"
          value="subtraction"
        ></v-radio>
        <v-radio
          label="multiplication"
          value="multiplication"
        ></v-radio>
        <v-radio
          label="division"
          value="division"
        ></v-radio>
        <v-radio
          label="square root"
          value="square_root"
        ></v-radio>
        <v-radio
          label="random string"
          value="random_string"
        ></v-radio>
      </v-radio-group>

      <v-row>
        <v-col cols md='4' v-if=" option != 'random_string'">
          <v-text-field
          label='First Number'
          v-model="firstNumber"
          class="py-2 pt-4"
          type="number"
          placeholder=""
          persistent-placeholder
          outlined
          color="black"
          hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols md='4' v-if=" option != 'random_string' && option != 'square_root'">
          <v-text-field
            label='Second Number'
            v-model="secondNumber"
            class="py-2 pt-4"
            type="number"
            placeholder=""
            persistent-placeholder
            outlined
            color="black"
            hide-details
            >

          </v-text-field>
        </v-col>

        <v-col cols :md="option != 'random_string' ? 4 : 8">
          <v-text-field
            label='Result'
            v-model="result"
            class="py-2 pt-4"
            placeholder=""
            persistent-placeholder
            outlined
            color="black"
            readonly
            hide-details
            :prepend-icon="option != 'random_string' ? 'mdi-equal-box' : ''"
            >

          </v-text-field>
        </v-col>

      </v-row>
    </v-card-text>
    <v-card-actions class="px-4 pb-4 d-block">
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-btn
            large
            width='300'
            depressed
            class="white--text"
            color="indigo"
            @click="send()"
          >
          Send
          <v-icon color='white' class='ml-2'>
            mdi-send
          </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-container>
</template>

<script>
import api from '@/services/api.js';

export default {
  name: 'OperationComponent',
  data: () => ({
    option: null,
    firstNumber: null,
    secondNumber: null,
    result: null,
  }),
  watch: {
    option() {
      this.result = null;
    }
  },
  methods: {
    send() {

      const params = new URLSearchParams();
      this.firstNumber ? params.append('firstNumber', this.firstNumber) : '';
      this.secondNumber ? params.append('secondNumber', this.secondNumber) : '';
      params.append('type', this.option);

      api.post('/calculate', params).then(response => {
          this.result = response.data.result;
          localStorage.setItem('userBalance', response.data.userBalance);
        })
        .catch(() => {
          alert("Insuficient Found");
        });
    }
  }
}
</script>
