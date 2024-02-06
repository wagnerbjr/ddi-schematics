/*import { Injectable } from "@angular/core";
import { DefaultHeaders, DetranHttpService, GET, QUERY } from "@ddi-ng/http";
import { <%= classify(name) %>Lista } from "../types/<%= dasherize(name) %>.dto";

@Injectable()
@DefaultHeaders({
  'Content-Type': 'application/json'
})
export class <%= classify(name) %>Service extends DetranHttpService {
  @GET('/<%= dasherize(name) %>/lista-<%= dasherize(name) %>')
  lista<%= classify(name) %>(
  ): Promise<<%= classify(name) %>Lista[]> {
    return null;
  }

  @GET('/<%= dasherize(name) %>/lista-pesquisar-<%= dasherize(name) %>')
  listaPesquisar<%= classify(name) %>(
    @QUERY('pageNum') pageNum: number,
    @QUERY('pageSize') pageSize: number,
    @QUERY('nome') nome: string,
    @QUERY('situacao') situacao: string
  ): Promise<<%= classify(name) %>Lista[]> {
    return null;
  }

}*/
