<template>
  <div class="w-full h-full bg-primary">
    <h2 class="text-[2rem]">List of Notes</h2>
    <hr class="my-6 border-t-[0.0625rem] border-[#2628330d]" />
    <div v-if="notes">
      <NoteCard v-for="note in notes" :key="note.id" :note="note"></NoteCard>
    </div>
    <p v-else class="font-light">
      There is no notes right now!
      <br />
      Click Create Note button to create one.
    </p>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from 'vue'
import AppModal from '~/components/App/AppModal.vue'
import NoteCard from '~/components/Notes/NoteCard.vue'
import { useNotesStore } from '~/store/notesStore'
import { useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useNotesStore()
    const router = useRouter()
    const notes = computed(() =>
      store.handleNotes.length ? store.handleNotes : false
    )
    store.fetchNotes()
    return {
      notes,
    }
  },
  components: { AppModal, NoteCard },
})
</script>
