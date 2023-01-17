<template>
  <AppCard class="p-0 mb-6">
    <div class="p-6">
      <h3 class="text-[2rem] py-3">{{ note?.title }}</h3>
      <ul>
        <li
          v-for="todo in note?.todos"
          :key="todo.id"
          class="list-disc list-inside"
          :class="{ 'line-through': todo.completed }"
        >
          {{ todo?.text }}
        </li>
      </ul>
    </div>
    <div class="flex gap-4 p-6">
      <AppButton
        class="text-primary text-[14px]"
        title="Go to note"
        @click="editNote(note.id)"
      />
      <AppButton
        class="text-danger text-[14px]"
        title="Delete Note"
        @click="toggleModal"
      />
    </div>
    <AppModal
      v-if="showModal"
      @confirm="removeNote(note.id)"
      @cancel="toggleModal"
    >
      <template #header>Your Note is saved!</template>
      <template #default
        >Do you want to exit to the main page? To continue edit this note,
        please click Cancel!</template
      >
    </AppModal>
  </AppCard>
</template>

<script>
import { useNotesStore } from '~/store/notesStore'
import AppButton from '../App/AppButton.vue'
import AppCard from '../App/AppCard.vue'
import { useRouter } from '@nuxtjs/composition-api'
import { ref } from 'vue'
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useNotesStore()
    const router = useRouter()

    const showModal = ref(false)

    const toggleModal = () => (showModal.value = !showModal.value)

    const removeNote = (id) => {
      store.removeNote(id)
      toggleModal()
    }

    const editNote = (id) => router.push(`/note/${id}`)

    return {
      showModal,
      toggleModal,
      editNote,
      removeNote,
    }
  },
}
</script>

<style lang="scss" scoped></style>
