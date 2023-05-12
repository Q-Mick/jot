import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { Pop } from "../Utils/Pop.js";
import { saveState } from "../Utils/Store.js";


function _saveNote() {
  saveState('notes', appState.Notes)
}

class NotesService{
  saveNote(NoteBody, noteID) {
    let noteToSave = appState.Notes.find(n => n.id == noteID)
    noteToSave.body = NoteBody
    _saveNote()
  }
  deleteNote(noteID) {
    let noteToDelete = appState.Notes.find(n => n.id == noteID)
    appState.Notes = appState.Notes.filter(n => n.id != noteID)
    _saveCars()
  }
  createNote(formData) {
    console.log("creating note for ", appState.currentUser);
   let newNote = new Note(formData)
   newNote.user = appState.currentUser
   newNote.body = "Type your note here"
   appState.Notes.push(newNote)
   _saveNote()
   console.log(appState.Notes)
   appState.emit('currentUser')
  }
  setActiveNote(noteID) {
    let foundNote = appState.Notes.find(n => n.id == noteID)
    // @ts-ignore
    console.log(foundNote)
    // @ts-ignore
    appState.currentNote = foundNote
    appState.emit('currentUser')
  }

  
}



export const notesService = new NotesService()

