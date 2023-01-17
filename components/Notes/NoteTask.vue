<template>
  <li ref="todoItem" class="shadow-soft rounded mt-4 py-2 px-4">
    <div class="flex justify-between">
      <div class="flex items-center flex-grow px-2">
        <input
          class="w-[20px] h-[20px] mr-3"
          type="checkbox"
          name="complete"
          id="complete"
          v-model="checked"
        />
        <h3
          v-if="!editable"
          class="font-light px-3"
          :class="{ 'line-through': todo.completed }"
          @click="editable = !editable"
        >
          {{ todo.text || 'Click to edit Todo' }}
        </h3>
        <input
          v-else
          class="w-full h-[32px] font-light bg-primary btn-active-shadow outline-none rounded-md px-3"
          type="text"
          :value="todo.text"
          @input="changeText"
        />
      </div>
      <div class="flex gap-2">
        <AppButton
          class="text-primary"
          :title="editable ? 'Save' : 'Edit'"
          @click="editable = !editable"
        />
        <AppButton class="text-danger" title="Delete" @click="deleteTodo" />
      </div>
    </div>
  </li>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ['input', 'check', 'detete'],
  setup(props, { emit }) {
    const todoItem = ref(false)

    const editable = ref(false)

    const checked = computed({
      get() {
        return props.todo.completed
      },
      set(val) {
        emit('check', val)
      },
    })

    onClickOutside(todoItem, () => {
      if (editable.value) {
        editable.value = false
      }
    })
    const changeText = (e) => emit('input', e.target.value)

    const deleteTodo = () => emit('detete')

    return {
      todoItem,
      checked,
      editable,
      changeText,
      deleteTodo,
    }
  },
}
</script>

<style lang="scss" scoped></style>
