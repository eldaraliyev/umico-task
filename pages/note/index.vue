<template>
  <main>
    <AppCard>
      <div class="flex justify-start gap-2 mb-4">
        <AppButton
          class="text-success"
          :disabled="!canUndo"
          title="Undo"
          @click="undo"
        />
        <AppButton
          class="text-info"
          :disabled="!canRedo"
          title="Redo"
          @click="redo"
        />
      </div>
      <AppCard>
        <div>
          <h3
            id="note-title"
            class="text-[2rem] p-3"
            v-if="!titleInput"
            @click="titleInput = !titleInput"
          >
            {{ note.title || 'Click to edit Title' }}
          </h3>
          <input
            v-else
            id="note-title-input"
            class="w-full text-[2rem] p-3 bg-primary btn-active-shadow outline-none rounded"
            type="text"
            v-model="note.title"
          />
        </div>
        <ul id="todos" class="mb-4">
          <li
            v-for="(todo, i) in note.todos"
            :key="todo.id"
            class="shadow-soft rounded mt-4 py-2 px-4"
          >
            <div
              class="flex justify-between flex-col md:flex-row gap-4 md:gap-0"
            >
              <div class="flex items-center flex-grow px-2">
                <input
                  class="w-[20px] h-[20px] mr-3"
                  type="checkbox"
                  name="complete"
                  id="complete"
                  v-model="note.todos[i].completed"
                />
                <h3
                  v-if="!todoInput"
                  id="todo-title"
                  class="font-light px-3"
                  :class="{ 'line-through': note.todos[i].completed }"
                  @click="todoInput = !todoInput"
                >
                  {{ note.todos[i].text || 'Click to edit Todo' }}
                </h3>
                <input
                  v-else
                  id="todo-title-input"
                  class="w-full h-[32px] font-light bg-primary btn-active-shadow outline-none rounded-md px-3"
                  type="text"
                  v-model="note.todos[i].text"
                />
              </div>
              <div class="flex gap-2">
                <AppButton
                  class="text-primary"
                  :title="todoInput ? 'Save' : 'Edit'"
                  @click="todoInput = !todoInput"
                />
                <AppButton
                  class="text-danger"
                  title="Delete"
                  @click="removeTodo(note.todos[i].id)"
                />
              </div>
            </div>
          </li>
        </ul>
        <AppButton class="mb-2" title="Add Todo" @click="addTodo" />
      </AppCard>
      <div class="flex justify-end gap-2 mt-6 mb-2">
        <AppButton class="text-success" title="Save" @click="toggleSaveModal" />
        <AppButton
          class="text-info"
          title="Cancel"
          @click="toggleCancelModal"
        />
        <AppButton
          class="text-danger"
          title="Delete"
          @click="toggleDeleteModal"
        />
      </div>
    </AppCard>
    <AppModal v-if="showSaveModal" @confirm="addNote" @cancel="toggleSaveModal">
      <template #header>Your Note is saved!</template>
      <template #default
        >Do you want to exit to the main page? To continue edit this note,
        please click Cancel!</template
      >
    </AppModal>
    <AppModal
      v-if="showCancelModal"
      @confirm="cancelNote"
      @cancel="toggleCancelModal"
    >
      <template #header>Do you realy want to cancel this Note?</template>
      <template #default>All unsaved changes will be lost!</template>
    </AppModal>
    <AppModal
      v-if="showDeleteModal"
      @confirm="deleteNote"
      @cancel="toggleDeleteModal"
    >
      <template #header>Do you realy want to delete this Note?</template>
      <template #default
        >You will be redirected to main page after this.</template
      >
    </AppModal>
  </main>
</template>

<script>
import { reactive, ref, watch, toRef } from 'vue'
import AppButton from '~/components/App/AppButton.vue'
import AppCard from '~/components/App/AppCard.vue'
import { useNotesStore } from '~/store/notesStore'
import { useRouter } from '@nuxtjs/composition-api'
import { useRefHistory } from '@vueuse/core'

export default {
  setup() {
    const store = useNotesStore()
    const router = useRouter()

    const showSaveModal = ref(false)
    const toggleSaveModal = () => (showSaveModal.value = !showSaveModal.value)
    const showCancelModal = ref(false)
    const toggleCancelModal = () =>
      (showCancelModal.value = !showCancelModal.value)
    const showDeleteModal = ref(false)
    const toggleDeleteModal = () =>
      (showDeleteModal.value = !showDeleteModal.value)

    const todo = reactive({
      id: store.generateId(),
      text: null,
      completed: false,
    })

    const note = ref({
      id: store.generateId(),
      title: null,
      todos: [],
    })

    const { undo, redo, canUndo, canRedo, clear } = useRefHistory(note, {
      deep: true,
    })

    const titleInput = ref(false)
    if (process.client) {
      document.addEventListener('click', (e) => {
        if (
          titleInput.value &&
          e.target.id !== 'note-title-input' &&
          e.target.id !== 'note-title'
        ) {
          titleInput.value = false
        }
      })
    }

    const todoInput = ref(false)
    if (process.client) {
      document.addEventListener('click', (e) => {
        if (
          todoInput.value &&
          e.target.id !== 'todo-title-input' &&
          e.target.id !== 'todo-title'
        ) {
          todoInput.value = false
        }
      })
    }

    function addTodo() {
      note.value.todos.push({
        ...todo,
        id: store.generateId(),
      })
    }

    function removeTodo(id) {
      note.value.todos = note.value.todos.filter((todo) => todo.id != id)
    }

    function addNote() {
      store.addNote(note.value)
      router.push('/')
    }

    function cancelNote() {
      router.push('/')
    }
    function deleteNote() {
      router.push('/')
    }
    return {
      undo,
      redo,
      canUndo,
      canRedo,
      showSaveModal,
      toggleSaveModal,
      showCancelModal,
      toggleCancelModal,
      showDeleteModal,
      toggleDeleteModal,
      todo,
      note,
      titleInput,
      todoInput,
      addTodo,
      removeTodo,
      addNote,
      cancelNote,
      deleteNote,
    }
  },
}
</script>

<style lang="scss" scoped></style>
