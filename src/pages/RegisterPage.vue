<template>
  <q-page-container class="container" style="padding-top: 0">
    <h4>SING UP</h4>
    <q-form @submit.prevent.stop="onSubmit" :validation-schema="schema">
      <q-input
        v-model="formData.name"
        for="username"
        label="Username"
        type="text"
        outlined
        lazy-rules="ondemand"
        :rules="[(val) => !!val || 'Field is required']"
        :error="!!errors.name"
        :error-message="errors.name"
        @blur="validateField('name')"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
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
      <q-input
        v-model="formData.confirmation"
        for="confirmation"
        label="Confirm password"
        type="password"
        outlined
        lazy-rules="ondemand"
        :error="!!errors.confirmation"
        :error-message="errors.confirmation"
        :rules="[
          (val) => !!val || 'Field is required',
          (val) => val.length >= 6 || 'Please use minimum 6 characters',
        ]"
        @blur="validateField('confirmation')"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-btn type="submit" label="Create Account" color="primary" />
    </q-form>
    <q-item-label>
      Already have an account?
      <q-btn flat label="Login here" :to="{ name: 'login' }" />
    </q-item-label>
  </q-page-container>
</template>

<script setup>
// import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { reactive } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { useUsersStore } from 'src/stores/users'

const authStore = useAuthStore()
const usersStore = useUsersStore()
const router = useRouter()
const route = useRoute()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmation: '',
})
const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmation: '',
})

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmation: yup.string().required().min(6),
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
    // const userCredential = await authStore.signUpWithEmailAndPasswordFn(
    //   formData.email,
    //   formData.password,
    // )

    const user = await authStore.signUpWithEmailAndPasswordFn(formData.email, formData.password)

    console.log('userCredential:', user)
    if (!user) throw new Error('Sign up failed')
    // const uid = userCredential.uid

    const uid = user.uid

    await usersStore.addUserWithCustomId({
      id: uid,
      data: {
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
        permissions: {
          create: false,
          read: true,
          update: false,
          delete: false,
        },
      },
    })

    const redirect = route.query.redirect || { name: 'home' }
    router.push(redirect)
  } catch (err) {
    if (err.inner) {
      console.log(err)
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
    } else {
      console.error('Registration error:', err)
    }
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
    // margin: 1rem;
  }
  Form {
    padding-bottom: 1rem;
  }
  .q-field--with-bottom {
    padding-bottom: 2rem;
  }
}
</style>
