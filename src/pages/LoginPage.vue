<template>
  <q-page-container class="container" style="padding-top: 0">
    <h4>LOGIN</h4>
    <q-form @submit.prevent.stop="onSubmit" :validation-schema="schema">
      <q-input
        v-model="formData.email"
        for="email"
        label="Email"
        type="email"
        outlined
        lazy-rules="ondemand"
        :rules="[(val) => !!val || 'Field is required']"
        :error="!!errors.email"
        :error-message="errors.email"
        @blur="validateField('email')"
      >
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>
      <q-input
        v-model="formData.password"
        for="password"
        label="Password"
        type="password"
        outlined
        lazy-rules="ondemand"
        :error="!!errors.password"
        :error-message="errors.password"
        :rules="[
          (val) => !!val || 'Field is required',
          (val) => val.length >= 6 || 'Please use minimum 6 characters',
        ]"
        @blur="validateField('password')"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-card-actions class="justify-evenly">
        <q-btn class="form-btn" label="LOGIN" type="submit" color="primary" />
        <q-btn class="form-btn" label="CANCEL" color="primary" :to="{ name: 'home' }" />
      </q-card-actions>
    </q-form>
    <q-card-actions class="justify-center column">
      <q-item-label
        >No account?<q-btn flat label="Create one" :to="{ name: 'register' }"
      /></q-item-label>
      <q-btn @click="onLoginWithGoogle" class="q-ma-md">
        <!-- <font-awesome-icon
       :icon="[ 'fab', 'google' ]" class="q-ma-sm"/> -->
        <q-img
          src="~assets/google-icon.png"
          :ratio="1"
          width="1.2rem"
          contain
          alt="google-logo"
          class="q-ma-sm"
        />
        Login with Google
      </q-btn>
    </q-card-actions>
  </q-page-container>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import * as yup from 'yup'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formData = reactive({
  email: '',
  password: '',
})
const errors = reactive({
  email: '',
  password: '',
})

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(6, 'At least 6 chars'),
})

const validateField = async (field) => {
  try {
    await schema.validateAt(field, formData)
    errors[field] = ''
  } catch (err) {
    errors[field] = err.message
  }
}

const onSubmit = async () => {
  // console.log('submit')
  try {
    await schema.validate(formData, { abortEarly: false })
    // console.log('formData', formData)
    await authStore.signInWithEmailAndPasswordFn(formData.email, formData.password)
    const redirect = route.query.redirect || { name: 'home' }
    router.push(redirect)
  } catch (err) {
    if (err.inner) {
      console.log(err)
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
    }
  }
}

async function onLoginWithGoogle() {
  try {
    await authStore.loginWithGoogleAccount()
    console.log(authStore.getUser)
    const redirect = route.query.redirect || { name: 'home' }
    router.push(redirect)
  } catch (error) {
    console.error(error.message)
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 30rem;
  // padding: 0; can't remove padding here, was removed in tag with style
  margin: 0 auto;
  h4,
  Form,
  .q-item__label {
    text-align: center;
  }
  Form {
    padding-bottom: 1rem;
    // margin: 0 auto;
  }
  .form-btn {
    width: 7rem;
  }
  .q-field--with-bottom {
    padding-bottom: 2rem;
  }
}
</style>
