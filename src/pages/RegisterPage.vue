<template>
  <q-page-container class="container" style="padding-top: 0">
    <h4>SING UP</h4>
    <Form :validation-schema="schema" @submit="onSubmit">
      <Field name="name" v-slot="{ field, errors }">
        <q-input
          v-bind="field"
          type="name"
          placeholder="Username"
          outlined
          :error="errors.length > 0"
          :error-message="errors[0]"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </Field>
      <Field name="email" v-slot="{ field, errors }">
        <q-input
          v-bind="field"
          type="email"
          placeholder="E-mail"
          outlined
          :error="errors.length > 0"
          :error-message="errors[0]"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </Field>
      <Field name="password" v-slot="{ field, errors }">
        <q-input
          v-bind="field"
          type="password"
          placeholder="Password"
          outlined
          :error="errors.length > 0"
          :error-message="errors[0]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </Field>
      <Field name="password" v-slot="{ field, errors }">
        <q-input
          v-bind="field"
          type="password"
          placeholder="Confirm Password"
          outlined
          :error="errors.length > 0"
          :error-message="errors[0]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </Field>
      <q-btn type="submit" label="Create Account" color="primary" />
    </Form>
    <q-item-label>
      Already have an account?
      <q-btn flat label="Login here" :to="{ name: 'login' }" />
    </q-item-label>
  </q-page-container>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
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
  }
}
</style>
