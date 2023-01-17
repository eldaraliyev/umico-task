import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])

  const handleNotes = computed(() => notes.value)

  const generateId = () => Math.random().toString(36).substring(2, 15)

  const handleNote = id => notes.value.find(note => note.id == id.value)

  function fetchNotes() {
    if (process.client) {
      if (!localStorage.notes) localStorage.setItem('notes', '[]') 
      const lsNotes = JSON.parse(localStorage.notes)
      notes.value = lsNotes
    }
  }

  function saveNotes() {
    if (process.client) {
      const item = JSON.stringify(notes.value)
      localStorage.setItem('notes', item)
    }
  }

  function addNote(note) {
    notes.value.push(note)
    saveNotes()

  }
  function editNote(note) {
    const index = notes.value.findIndex(item => item.id === note.id)
    notes.value[index] = note
    saveNotes()
  }

  function removeNote(id) {
    notes.value = notes.value.filter(note => note.id != id)
    saveNotes()
  }

  return {
    // State
    notes,
    // Getters
    handleNotes,
    // Actions
    handleNote,
    generateId,
    fetchNotes,
    saveNotes,
    addNote,
    editNote,
    removeNote
  }
})