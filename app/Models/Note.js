import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";



export class Note {
  constructor(data){
    
    this.id = generateId()
    this.title = data.title
    // this.description = data.description
    this.dateCreated = data.date ? new Date(data.date) : new Date()
    this.body = data.body || 'Write your note here'
    this.updatedTime = ""
    this.user = data.user


    
  }

  get NoteTemplate() {
    let date = this.ComputeDate
    console.log(this.title);
    return `
    <div class="col-md-8">
        <p onclick="app.notesController.setActiveNote('${this.id}')" class="fs-3">${this.title}</p>
        <p>Created on ${date}</p>
        `
        // </div>
        // <div class="col-md-4 text-end">
        //   <button class="btn btn-primary" onclick="">
        //     <i class="mdi mdi-content-save"></i>
        //   </button>
        // </div>
        // <div class="col-md-12">
        //   <textarea onblur="app.casesController.saveReport()" class="w-100 reportBody" name="reportBody" id="reportBody" cols="30" rows="10">${this.body}</textarea>
        // </div>
  }
  get ComputeDate() {
    let date = this.dateCreated
    // NOTE each date.getXYZ is its own string so it needs to be wrapped in its own parens and then string concatenated with the other info 
    return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
  }

  get ActiveNoteTemplate() {
    return `
        <div class="col-md-8">

          </div>
          <div class="col-md-12 text-end">
            <button class="btn btn-primary m-1" onclick="app.notesController.saveNote('${this.id}')">
              <i class="mdi mdi-content-save"> Save Note</i>
            </button>
            <button class="btn btn-primary m-1" onclick="app.notesController.deleteNote('${this.id}')">
              <i class="mdi mdi-delete"> Delete Note</i>
            </button>
          </div>
          <div class="col-md-12">
            <textarea id="note-body" onblur="app.notesController.saveNote()" class="w-100 reportBody" name="body" id="body" cols="30" rows="10">${this.body}</textarea>
          </div>
    `
  }
}