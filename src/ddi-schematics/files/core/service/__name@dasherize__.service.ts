/*import { Injectable } from "@angular/core";
import { DefaultHeaders, DetranHttpService, GET, QUERY, BODY, POST } from "@ddi-ng/http";
import { <%= classify(name) %>Lista,  
         <%= classify(name) %>DetalhesDto,  
         <%= classify(name) %>InclusaoDto
       } 
from "../types/<%= dasherize(name) %>.dto";

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

  // MODAL ALTERAR
 
  @GET('/<%= dasherize(name) %>/consulta-<%= dasherize(name) %>')
  consulta<%= classify(name) %>(
    @QUERY('codigo') codigo: number
  ): Promise<ProvaPraticaDetalhesDTO> {
    return null;
  }
 
  @POST('/<%= dasherize(name) %>/altera-<%= dasherize(name) %>')
  altera<%= classify(name) %>(
    @BODY <%= camelize(name) %>DetalhesDTO: <%= classify(name) %>DetalhesDTO
  ): Promise<void> {
    return null;
  }

  //** MODAL INCLUIR
 
  @POST('/<%= dasherize(name) %>/inclui-<%= dasherize(name) %>')
  inclui<%= classify(name) %>(
    @BODY <%= camelize(name) %>InclusaoDTO: <%= classify(name) %>InclusaoDTO
  ): Promise<void> {
    return null;
  }

}*/
