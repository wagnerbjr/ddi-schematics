/*import { Injectable } from "@angular/core";
import { AbstractAction } from "@ddi-ng/store";
import { <%= classify(name) %>Service } from "../service/<%= dasherize(name) %>.service";
import { <%= classify(name) %>ActionTypes } from "./<%= dasherize(name) %>.actions.types";

@Injectable()
export class <%= classify(name) %>Actions extends AbstractAction {
  constructor(private service: <%= classify(name) %>Service) {
    super();
  }

  listaPesquisar<%= classify(name) %>(
    pageNum: number,
    pageSize: number,
    nome: string,
    situacao: string
  ): void {
    this.dispatch({
      type: <%= classify(name) %>ActionTypes.LISTAR,
      payload: this.service.listaPesquisar<%= classify(name) %>(
        pageNum,
        pageSize,
        nome,
        situacao
      )
    })
  }

}
*/