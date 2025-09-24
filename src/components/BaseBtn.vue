<template>
  <div>
    <q-btn :flat="$attrs.flat !== undefined ? $attrs.flat : true" :size="$attrs.size || 'lg'" v-bind="$attrs"/>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
