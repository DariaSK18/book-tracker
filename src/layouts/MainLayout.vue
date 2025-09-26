<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-img src="~assets/logo.png" :ratio="3 / 2" cover alt="logo" class="q-ma-md logo" />
        <q-toolbar-title> Mr. Bookich </q-toolbar-title>
        <!-- {{ getUser }} -->
        <div class="q-ma-md" v-if="!getUser">
          <q-btn flat rounded :to="{ name: 'login' }">
            <q-icon name="account_circle" class="q-ma-sm" size="sm" />
            LogIn
          </q-btn>
        </div>
        <div class="q-ma-md" v-else>
          <q-icon name="account_circle" class="q-ma-sm" size="sm" />
          {{ getUser.displayName || getUser.email }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Your collections</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        <q-icon name="language" />
        <q-icon name="account_box" />
        <!-- <div class="q-ma-md"> -->
        <q-icon name="dark_mode" />
        <q-icon name="light_mode" />
        <!-- </div> -->
      </q-list>
      <q-btn label="Logout" color="primary" rounded="" class="q-ma-lg" @click="onLogout" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div class="row justify-evenly items-center">
        <BaseBtn icon="home" :to="{ name: 'home' }" />
        <!-- <q-btn flat icon="menu_book" size="lg" :to="{ name: 'home' }" /> -->
        <BaseBtn icon="auto_stories" :to="{ name: 'books' }" />
        <!-- <q-btn dense push icon="add" size="lg" :to="{ name: 'home' }" /> -->
        <BaseBtn
          class="base-btn-pushed"
          :flat="false"
          round
          icon="add_circle"
          size="xl"
          :to="{ name: 'addBook' }"
        />
        <BaseBtn icon="task_alt" :to="{ name: 'goals' }" />
        <BaseBtn icon="bar_chart" :to="{ name: 'stats' }" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import BaseBtn from '../components/BaseBtn.vue'
import { useAuthStore } from 'src/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const getUser = computed(() => auth.getUser)
const router = useRouter()

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

function onLogout() {
  auth.logOut()
  router.push({
    name: 'home',
  })
}

onMounted(() => {
  auth.initAuthListener()
})

// watch: {
//     '$i18n.locale'(newLocale) {
//       localStorage.setItem('locale', newLocale)
//     },
//   },
//   created() {
//     this.$i18n.locale = localStorage.getItem('locale') || 'en'
//     if (localStorage.getItem('locale') !== this.$i18n.locale)
//       localStorage.setItem('locale', this.$i18n.locale)
//     const self = this
//     window.addEventListener('storage', function () {
//       if (self.$i18n.locale !== localStorage.getItem('locale')) {
//         self.$i18n.locale = localStorage.getItem('locale')
//         self.$router.go()
//       }
//     })
//   }
</script>
<style lang="scss" scoped>
.logo {
  border-radius: 18px;
  width: 60px;
}
.base-btn-pushed {
  margin-top: -30px;
  background: $primary;
  // background: #66adf4;
  border-radius: 50%;
  // border: 1px solid #66adf4;
}
</style>
