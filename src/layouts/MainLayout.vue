<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>MR. Bookich</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Your collections</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      footer
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Add single book',
    caption: 'quasar.dev',
    icon: 'book',
    link: 'https://quasar.dev',
  },
  {
    title: 'Add multiple books',
    caption: 'github.com/quasarframework',
    icon: 'book',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discover books',
    caption: 'chat.quasar.dev',
    icon: 'search',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Goodreads import (pro)',
    caption: 'forum.quasar.dev',
    icon: 'download',
    link: 'https://forum.quasar.dev',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
