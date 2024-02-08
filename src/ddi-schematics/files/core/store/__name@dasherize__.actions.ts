/*import { Injectable } from "@angular/core";
import { AbstractAction } from "@ddi-ng/store";
import { <%= classify(name) %>Service } from "../service/<%= dasherize(name) %>.service";
import { <%= classify(name) %>ActionTypes } from "./<%= dasherize(name) %>.actions.types";
import { <%= classify(name) %>DetalhesDTO,
         <%= classify(name) %>InclusaoDTO
       } 
 from "../types/<%= dasherize(name) %>.dto";
import {  , <%= classify(name) %>DetalhesDTO } from "../types/<%= dasherize(name) %>.dto";

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

  // INSERÇÃO MODAL DE EDITAR
 
  consulta<%= classify(name) %>(id: number){
    this.dispatch({
      type: <%= classify(name) %>ActionTypes.CONSULTAR,
      payload: this.service.consulta<%= classify(name) %>(id)
    });
  }
 
  altera<%= classify(name) %>(<%= camelize(name) %>DetalhesDTO: <%= classify(name) %>DetalhesDTO) {
    this.dispatch({
      type:<%= classify(name) %>ActionTypes.ALTERAR,
      payload: this.service.altera<%= classify(name) %>(<%= camelize(name) %>DetalhesDTO)
    })
  }

  //** MODAL DE INCLUIR
 
  inclui<%= classify(name) %>(<%= camelize(name) %>InclusaoDTO: <%= classify(name) %>InclusaoDTO) {
    this.dispatch({
      type:<%= classify(name) %>ActionTypes.INCLUIR,
      payload: this.service.inclui<%= classify(name) %>(<%= camelize(name) %>InclusaoDTO)
    })
  }

}
*/