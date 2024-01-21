/*import { Injectable } from "@angular/core";
import { AbstractEffect } from "@ddi-ng/store";
import { <%= classify(name) %>ActionTypes } from "./<%= classify(name) %>.actions.types";

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Effects extends AbstractEffect {
constructor() {
  super();

  this.registerAfterEffects({
    type: `${<%= classify(name) %>ActionTypes.LISTAR}_FULFILLED`,
    effect: () => {}
  });
}
}
*/