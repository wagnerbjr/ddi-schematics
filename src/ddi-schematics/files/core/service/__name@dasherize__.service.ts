/*import { Injectable } from "@angular/core";
import { DefaultHeaders, DetranHttpService, GET } from "@ddi-ng/http";
import { <%= classify(name) %>Lista } from "../types/<%= dasherize(name) %>.dto";

@Injectable()
@DefaultHeaders({
  'Content-Type': 'application/json'
})
export class <%= classify(name) %>Service extends DetranHttpService {
  @GET('/dominio/lista-<%= dasherize(name) %>')
  lista<%= classify(name) %>(
  ): Promise<<%= classify(name) %>Lista[]> {
    return null;
  }
}*/
