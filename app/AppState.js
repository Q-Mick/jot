import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"
import { Note } from "./Models/Note.js"


class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  // values = loadState('values', [Value])

  /** @type {import('./Models/Note.js').Note[]} */
  // Notes = [
  //   new Note (
  //     {
  //       title: "First Note",
  //       body: "This is your first note!",
  //       user: "Me"
  //     }
  //   ),
  //   new Note (
  //     {
  //       title: "Second Note",
  //       body: "This is your second note!",
  //       user: "Me"
  //     }
  //   )
  // ]
  /** @type {import('./Models/Note').Note[]} */
  Notes = loadState('notes', [Note])
  
  currentUser = null
  currentNote = null
}

// 
export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
