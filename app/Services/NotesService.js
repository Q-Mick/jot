import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { Pop } from "../Utils/Pop.js"
import { saveState } from "../Utils/Store.js"
import { setHTML } from "../Utils/Writer.js"

function _saveNote() {
  appState.emit('notes')
  saveState("notes", appState.Notes)
}

class NotesService {
  saveNote(noteBody, noteID) {
    // console.log(noteBody);
    let noteToSave = appState.Notes.find((n) => n.id == noteID)
    let update = noteToSave?.ComputeUpdateTime
    // @ts-ignore
    noteToSave.updatedTime = update
    appState.emit("currentNote")
    appState.emit("currentUser")
    console.log(noteToSave, update);

    // @ts-ignore
    // noteToSave.body = noteBody
    _saveNote()
  }
  deleteNote(noteID) {
    // let noteToDelete = appState.Notes.find(n => n.id == noteID)
    appState.Notes = appState.Notes.filter((n) => n.id != noteID)
    // setHTML('note-body', '<h1 class="text-white">Click or create a note to begin</h1>')
    // @ts-ignore
    appState.emit("currentNote")
    appState.emit("currentUser")
    _saveNote()
  }

  createNote(formData) {
    console.log("creating note for ", appState.currentUser)
    let newNote = new Note(formData)
    if (newNote.title == "") {
      Pop.toast("Your note must have a title.")
      return
    }
    let createdTime = newNote.ComputeDate
    newNote.dateCreated = createdTime
    let update = newNote?.ComputeUpdateTime
    newNote.updatedTime = update
    console.log(createdTime);
    newNote.user = appState.currentUser
    newNote.body = "Type your note here"
    appState.Notes.push(newNote)
    // @ts-ignore
    appState.currentNote = newNote
    _saveNote()
    //  console.log(appState.Notes)
    appState.emit("currentUser")
  }

  setActiveNote(noteID) {
    let foundNote = appState.Notes.find((n) => n.id == noteID)
    // @ts-ignore
    // console.log(foundNote)
    // @ts-ignore
    appState.currentNote = foundNote
    appState.emit("currentUser")
  }
}

export const notesService = new NotesService()
