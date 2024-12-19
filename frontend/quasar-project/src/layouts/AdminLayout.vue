<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-h2"> <strong>Admin</strong> Knjiznica </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "AdminLayout",
});

let title= computed(()=>{
  return "Knjižnica (admin)"
});

const linksList = [
  {
    title: "Admin početna",
    caption: "Admin početna",
    icon: "home",
    link: "#/admin",
  },
  {
    title: "Popis knjiga",
    caption: "Popis knjiga",
    icon: "chat",
    link: "#/admin/PopisKnjiga",
  },
  {
    title: "Popis knjiga iz baze",
    caption: "Popis knjiga",
    icon: "chat",
    link: "#/admin/popis_knjiga_baza",
  },
  {
    title: "Popis korisnika",
    caption: "Popis korisnika",
    icon: "chat",
    link: "#/admin/popis_korisnici",
  },
  {
    title: "Rezervirane Knjige",
    caption: "Rezervirane Knjige",
    icon: "chat",
    link: "#/admin/rezervirane_knjige",
  },
  {
    title: "Unos Knjige",
    caption: "Unos Knjige",
    icon: "chat",
    link: "#/admin/unos_knjige",
  },
  {
    title: "Logout",
    caption: "Logout",
    icon: "chat",
    link: "#/admin/logout",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
