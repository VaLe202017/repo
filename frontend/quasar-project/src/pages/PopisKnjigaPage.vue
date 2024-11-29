<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-input
        v-model="searchQuery"
        label="Unesite naziv ili autora knjige"
        outlined
        clearable
      />

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Naziv Knjige</th>
            <th class="text-right">Pisac</th>
            <th class="text-right">Godina</th>
          </tr>
          
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Hobbit</td>
            <td class="text-right">John Ronald Reuel Tolkien</td>
            <td class="text-right">1937</td>
          </tr>
          <tr>
            <td class="text-left">Harry Potter</td>
            <td class="text-right">J. K. Rowling</td>
            <td class="text-right">1997</td>
          </tr>
          <tr>
            <td class="text-left">Little Red Riding Hood</td>
            <td class="text-right">Charles Perrault</td>
            <td class="text-right">1697</td>
          </tr>
          <tr>
            <td class="text-left">Lord Of The Rings</td>
            <td class="text-right">John Ronald Reuel Tolkien</td>
            <td class="text-right">1954</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const searchQuery = ref('');
    const searchByTitle = ref(true);
    const searchByAuthor = ref(false);

    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: row => row.id },
      { name: 'naslov', label: 'Naslov', align: 'left', field: row => row.naslov },
      { name: 'autor', label: 'Pisac', align: 'left', field: row => row.autor },
      { name: 'godina', label: 'Godina', align: 'right', field: row => row.godina }
    ];

    const books = [
        { id: 1, naslov: 'Hobbit', autor: 'John Ronald Reuel Tolkien', godina: 1937},
        { id: 2, naslov: 'Harry Potter', autor: 'J. K. Rowling', godina: 1997 },
        { id: 3, naslov: 'Little Red Riding Hood', autor: 'Charles Perrault', godina: 1697},
        { id: 4, naslov: 'Lord Of The Rings', autor: 'John Ronald Reuel Tolkien', godina: 1954}
      ]


    const filteredBooks = ref([]);

    const performSearch = () => {
      if (!searchQuery.value) {
        filteredBooks.value = [];
        return;
      }
      filteredBooks.value = books.filter(book => {
        const matchesTitle = searchByTitle.value && book.naslov.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesAuthor = searchByAuthor.value && book.autor.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesTitle || matchesAuthor;
      });
    };

    return {
      val: ref(true),
      searchQuery,
      searchByTitle,
      searchByAuthor,
      columns,
      books,
      filteredBooks,
      performSearch
    };
  }
};
</script>
