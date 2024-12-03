<template>
  <q-page class="q-pa-md">
    <q-card flat bordered>
      <q-card-section>
        <q-select
          v-model="selectedBook"
          :options="bookOptions"
          label="Search for a book"
          @update:model-value="filterTable"
          outlined
          dense
        />
      </q-card-section>

      <q-table
        :rows="filteredBooks"
        :columns="columns"
        row-key="id"
        flat
        bordered
        separator="horizontal"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props" :class="getHighlightClass(props.row)">
            {{ props.value }}
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      selectedBook: null,
      books: [
        {
          id: 1,
          title: "Hobbit",
          author: "John Ronald Reuel Tolkien",
          opis: "Glavni lik u priči je Bilbo Bagins. On je hobit, koji sretno živi u svojoj kući Beg End. Međutim, jednog dana mu dolazi stari čarobnjak Gandalf i nagovara Bilboa da krene sa njim u avanturu",
          stanje: 10,
        },
        {
          id: 2,
          title: "Harry Potter",
          author: "J. K. Rowling",
          opis: "Harry Potter je serijal od sedam romana koje je napisala britanska književnica J. K. Rowling. Knjige opisuju avanture mladog čarobnjaka Harryja Pottera i njegovih najboljih prijatelja Rona Weasleyja i Hermione Granger, učenika Škole vještičarenja i čarobnjaštva Hogwarts",
          stanje: 7,
        },
        {
          id: 3,
          title: "Lord Of The Rings",
          author: "Author 1",
          opis: "Gospodar prstenova epski je fantastični roman kojeg je napisao engleski akademik i filolog J. R. R. Tolkien. Priča je započeta kao nastavak Tolkienovog ranijeg djela, Hobita, ali se razvila u mnogo veću i kompleksniju priču.",
          stanje: 4,
        },
      ],
      columns: [
        { name: "title", label: "Title", field: "title", align: "left" },
        { name: "author", label: "Author", field: "author", align: "left" },
        { name: "opis", label: "Opis", field: "opis", align: "left" },
        { name: "stanje", label: "Stanje", field: "stanje", align: "left" },
      ],
    };
  },
  computed: {
    bookOptions() {
      return this.books.map((book) => book.title);
    },
    filteredBooks() {
      if (this.selectedBook) {
        return this.books.filter((book) => book.title === this.selectedBook);
      }
      return this.books;
    },
  },
  methods: {
    filterTable(value) {
      this.selectedBook = value;
    },
    getHighlightClass(row) {
      return row.title === this.selectedBook ? "bg-yellow text-bold" : "";
    },
  },
};
</script>

<style>
.bg-yellow {
  background-color: yellow;
}
.text-bold {
  font-weight: bold;
}
</style>
