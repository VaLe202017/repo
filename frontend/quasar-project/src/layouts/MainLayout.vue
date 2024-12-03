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

        <q-toolbar-title class="text-h2"> Knjiznica </q-toolbar-title>

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
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Naslovna",
    caption: "Naslovna",
    icon: "home",
    link: "#/",
  },
  {
    title: "Registracija",
    caption: "Registracija",
    icon: "chat",
    link: "#/registracija",
  },
  {
    title: "Login",
    caption: "Login",
    icon: "chat",
    link: "#/login",
  },
  {
    title: "Lokacija",
    caption: "Lokacija",
    icon: "home",
    link: "#/Lokacija",
  },
  {
    title: "Popis knjiga",
    caption: "Popis knjiga",
    icon: "chat",
    link: "#/PopisKnjiga",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
