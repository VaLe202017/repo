<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-markup-table>
      <q-checkbox v-model="val" />
      <thead>
        <tr>
          <th class="text-left">Naziv Knjige</th>
          <th class="text-right">Hobbit</th>
          <th class="text-right">Harry Potter</th>
          <th class="text-right">Little Red Riding Hood</th>
          <th class="text-right">Lord Of The Rings</th>
        </tr>
        <q-checkbox v-model="val" />
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Pisac</td>
          <td class="text-right">John Ronald Reuel Tolkien</td>
          <td class="text-right">J. K. Rowling</td>
          <td class="text-right">Charles Perrault</td>
          <td class="text-right">John Ronald Reuel Tolkien</td>
        </tr>
        <tr>
          <td class="text-left">Godina</td>
          <td class="text-right">1937</td>
          <td class="text-right">1997</td>
          <td class="text-right">1697</td>
          <td class="text-right">1954</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      val: ref(true)
    }
  }
}
</script>
