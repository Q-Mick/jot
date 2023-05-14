import { NotesController } from "./Controllers/NotesController.js";
// import { UserController } from "./Controllers/UserController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();

  // usersController = new UserController();
  notesController = new NotesController();
}

window["app"] = new App();
