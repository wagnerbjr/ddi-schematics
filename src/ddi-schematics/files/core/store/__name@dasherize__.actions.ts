/*import { Injectable } from "@angular/core";
import { AbstractAction } from "@ddi-ng/store";
import { <%= capitalize(name) %>Service } from "../service/<%= dasherize(name) %>.service";
import { <%= capitalize(name) %>ActionTypes } from "./<%= dasherize(name) %>.actions.types";

@Injectable()
export class <%= capitalize(name) %>Actions extends AbstractAction {
  constructor(private service: <%= capitalize(name) %>Service) {
    super();
  }

  lista<%= capitalize(name) %>(): void {
    this.dispatch({
      type: <%= capitalize(name) %>ActionTypes.LISTAR,
      payload: this.service.lista<%= capitalize(name) %>()
    })
  }

}
*/