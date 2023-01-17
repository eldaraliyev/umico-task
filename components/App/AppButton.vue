<template>
  <button
    class="btn bg-primary rounded btn-shadow-soft px-4 py-2 hover:btn-active-shadow disabled:shadow-none"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="disabled"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      default: 'test',
      type: String,
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped></style>
