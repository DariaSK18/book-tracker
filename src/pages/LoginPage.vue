<template>
  <q-page-container class="container" style="padding-top: 0">
    <h4>LOGIN</h4>
    <Form :validation-schema="schema"
    :initial-values="initialValues"
     @submit="onSubmit">
      <Field name="email" v-slot="{ field, errors }">
        <q-input
          v-model="field.value"
          type="email"
          placeholder="Email"
          outlined
          :error="errors.length > 0"
          :error-message="errors[0]"
          @blur="field.blur"
          @input="field.value = $event"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </Field>
      <Field name="password" v-slot="{ field, errors }">
        <q-input
          v-model="field.value"
          type="password"
          placeholder="Password"
          outlined
          :error="errors.length > 0"
          :error-message="errors[0]"
          @blur="field.blur"
          @input="field.value = $event"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </Field>
      <q-card-actions class="justify-evenly">
        <q-btn class="form-btn" label="LOGIN" type="submit" color="primary" />
        <q-btn class="form-btn" label="CANCEL" color="primary" :to="{ name: 'home' }" />
      </q-card-actions>
    </Form>
    <q-card-actions class="justify-center column">
      <q-item-label
        >No account?<q-btn flat label="Create one" :to="{ name: 'register' }"
      /></q-item-label>
      <q-btn @click="onLogin" class="q-ma-md">
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
// import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()

// const email = ref('')

// const initialValues = {
//   email: '',
//   password: ''
// }

const onSubmit = (values) => {
  console.log('Form submitted:', values)
  // здесь можно вызвать функцию логина, например:
  // authStore.signInWithWithEmailAndPassword(values.email, values.password)
}

async function onLogin() {
  try {
    await authStore.loginWithGoogleAccount()
    router.push({
      name: 'login',
    })
  } catch (error) {
    console.error(error.message)
  }
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})
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
