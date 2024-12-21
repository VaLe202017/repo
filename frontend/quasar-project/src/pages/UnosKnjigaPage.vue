<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="naslov"
          label="Naziv knjige *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Unesite naziv knjige']"
        />

        <q-input
          filled
          v-model="autor"
          label="Autor *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesite naziv autora',
          ]"
        />
        <q-input
          filled
          v-model="opis"
          label="Opis *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesite opis knjige',
          ]"
        />
        <q-input
          filled
          v-model="slika"
          label="URL slike *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesite URL za sliku',
          ]"
        />
        <q-input
          filled
          type="number"
          v-model="stanje"
          label="Stanje knjiga *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Unesite stanje knjige',
          ]"
        />
        <div>
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            @click="insertBooks()"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const naslov = ref(null);
    const autor = ref(null);
    const opis = ref(null);
    const slika = ref(null);
    const stanje = ref(null);

    return {
      naslov,
      autor,
      opis,
      slika,
      stanje,
    };
  },
  methods: {
    async insertBooks() {
      const formData = {
        naslov: this.naslov,
        autor: this.autor,
        opis: this.opis,
        slika: this.slika,
        stanje: this.stanje,
      };
      await axios
        .post("http://localhost:3000/api/knjige_unos", formData)
        .then((result) => {
          console.log(result.data.data);
          console.log(this.books[0].id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
