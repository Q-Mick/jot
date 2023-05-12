import { generateId } from "../Utils/generateId.js";
import { appState } from "../AppState.js";

export class User {
  constructor(data){
    this.id = generateId() 
    this.userName = data.userName
    
  }
}