/*import { Injectable } from "@angular/core";
import { AbstractAction } from "@ddi-ng/store";
import { <%= classify(name) %>Service } from "../service/<%= dasherize(name) %>.service";
import { <%= classify(name) %>ActionTypes } from "./<%= dasherize(name) %>.actions.types";

@Injectable()
export class <%= classify(name) %>Actions extends AbstractAction {
  constructor(private service: <%= classify(name) %>Service) {
    super();
  }

  lista<%= classify(name) %>(): void {
    this.dispatch({
      type: <%= classify(name) %>ActionTypes.LISTAR,
      payload: this.service.lista<%= classify(name) %>()
    })
  }

}
*/