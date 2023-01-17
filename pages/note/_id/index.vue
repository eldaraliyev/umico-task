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
          <NoteTask
            v-for="(todo, i) in note.todos"
            :key="todo.id"
            :todo="todo"
            @check="todo.completed = !todo.completed"
            @input="updateText($event, i)"
            @detete="removeTodo(todo.id)"
          ></NoteTask>
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
    <AppModal
      v-if="showSaveModal"
      @confirm="editNote"
      @cancel="toggleSaveModal"
    >
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
      @confirm="deleteNote(note.id)"
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
import { reactive, ref, computed, onBeforeMount } from 'vue'
import AppButton from '~/components/App/AppButton.vue'
import AppCard from '~/components/App/AppCard.vue'
import { useNotesStore } from '~/store/notesStore'
import { useRoute, useRouter } from '@nuxtjs/composition-api'
import { useRefHistory } from '@vueuse/core'
import NoteTask from '~/components/Notes/NoteTask.vue'

export default {
  setup() {
    const store = useNotesStore()
    const router = useRouter()
    const route = useRoute()
    const showSaveModal = ref(false)
    const toggleSaveModal = () => (showSaveModal.value = !showSaveModal.value)
    const showCancelModal = ref(false)
    const toggleCancelModal = () =>
      (showCancelModal.value = !showCancelModal.value)
    const showDeleteModal = ref(false)
    const toggleDeleteModal = () =>
      (showDeleteModal.value = !showDeleteModal.value)
    store.fetchNotes()
    const todo = reactive({
      text: null,
      completed: false,
    })
    const note = ref({
      id: null,
      title: null,
      todos: [],
    })
    const { undo, redo, canUndo, canRedo, clear } = useRefHistory(note, {
      deep: true,
    })
    function init() {
      if (process.client) {
        const id = computed(() => route.value.params.id)
        const currentNote = store.handleNote(id)
        note.value.id = currentNote.id
        note.value.title = currentNote.title
        note.value.todos = currentNote.todos
      }
    }
    init()
    onBeforeMount(clear())
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
    
    function updateText(e, index) {
      note.value.todos[index].text = e
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
    const editNote = () => {
      store.editNote(note.value)
      router.push('/')
    }
    const cancelNote = () => router.push('/')
    const deleteNote = (id) => {
      store.removeNote(id)
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
      updateText,
      todo,
      note,
      titleInput,
      addTodo,
      removeTodo,
      editNote,
      cancelNote,
      deleteNote,
    }
  },
  components: { NoteTask },
}
</script>

<style lang="scss" scoped></style>
