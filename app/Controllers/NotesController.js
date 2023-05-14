import { Pop } from "../Utils/Pop.js";
import { notesService } from "../Services/NotesService.js";
import { appState } from "../AppState.js";
import { setHTML } from "../Utils/Writer.js";
import { getFormData } from "../Utils/FormHandler.js";

function _drawNote(){
  let notes = appState.Notes
  let filterNotes = notes.filter(n => n.user == appState.currentUser)
  let totalNotes = filterNotes.length
  let user = appState.currentUser
  let template = `${user} - Total Notes: ` + totalNotes
  // notes.forEach(n => template += n.NoteTemplate)
  // setHTML('notes', template)
  // STUB This code will be used to filter notes per user 

  // console.log(filterNotes)
  filterNotes.forEach(n => template += n.NoteTemplate)
  
    
  setHTML('notes', template)
}

function _drawActiveNote(){
  // if (appState.currentNote. = "") {
  //   setHTML('notes-body', "")
  // }
  let note = appState.currentNote
  // @ts-ignore
  console.log(note);
  // @ts-ignore
  setHTML('notes-body', note.ActiveNoteTemplate)
  
  
}

function _drawBlank(){
  let note = appState.currentNote
  // @ts-ignore
  setHTML('notes-body', note.EmptyTemplate)
}

export class NotesController {
  constructor(){
      // console.log("Hello from the Notes Controller");
      // _drawNote()
      appState.on('currentUser', _drawNote)
      appState.on('currentNote', _drawActiveNote)


  }

setActiveNote(noteID){
  notesService.setActiveNote(noteID)
}

createNote(){
  // @ts-ignore
  window.event.preventDefault()
    // console.log('form is being submitted')

    let form = event?.target
    let formData = getFormData(form)
    console.log(formData);

    
  notesService.createNote(formData)
}

saveNote(noteID){
  let docElem = document.getElementById("note-body")
  // @ts-ignore
  let noteBody = docElem.value
  Pop.toast('Note has been saved.')
  // console.log(noteBody)
  let note = appState.currentNote
  // @ts-ignore
  note.body = noteBody
  notesService.saveNote(noteBody, noteID)
}
async deleteNote(noteID){
  
  // @ts-ignore
  let currentNote = appState.currentNote
  console.log(currentNote);
  // console.log('delete the note', noteID);
        if (await Pop.confirm("Are you sure about that?")) {
            notesService.deleteNote(noteID)
            _drawBlank()
        }
}
async login() {
  let input = await Pop.prompt('Please type your username')
  // NOTE how do you get this to run on page load --> put it in the constructor
  // console.log('this is the input', input);
  // console.log(input)
  appState.currentUser = input
}

}