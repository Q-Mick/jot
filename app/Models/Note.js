import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";



export class Note {
  constructor(data){
    
    this.id = generateId()
    this.title = data.title
    // this.description = data.description
    this.dateCreated = data.dateCreated
    // ? new Date(data.date) : new Date()
    this.body = data.body || 'Write your note here'
    this.updatedTime = data.updatedTime
    this.user = data.user
    this.color = data.color


    
  }

  get NoteTemplate() {
    
    let date = this.ComputeDate
    console.log(this.dateCreated);
    
    return `
    <div class="col elevation-5">
        <p onclick="app.notesController.setActiveNote('${this.id}')" class="fs-5 px-1 m-0">${this.title} <button class="rounded" style="background-color: ${this.color}"></button></p>
        <p class="m-0 px-1">Created on ${this.dateCreated}</p>
        <p class="px-1 my-updated">Updated: ${this.updatedTime} on ${date} </p>
        `
  }
  get ComputeDate() {
    let date = new Date()
    // let date = this.dateCreated
    // NOTE each date.getXYZ is its own string so it needs to be wrapped in its own parens and then string concatenated with the other info 
    // NOTE trying to memorize this
    return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
  }

  get ComputeUpdateTime(){
    let newDate = new Date();
    let hours = newDate.getHours()
    let minutes = newDate.getMinutes()
    let ampm = 'AM'
    // format ampm and time
    if (hours >= 12){
      ampm = 'PM'
      if (hours > 12){
        hours -= 12
      }
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    let updateTime = hours + ':' + minutes + ' ' + ampm
    return updateTime
  }

  get EmptyTemplate(){
    return `
    <div class="col-md-8">

      </div>`
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
            <textarea id="note-body"  class="w-100 reportBody" name="body" id="body" cols="30" rows="10">${this.body}</textarea>
          </div>
    `
  }
}