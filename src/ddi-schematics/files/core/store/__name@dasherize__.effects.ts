/*import { Injectable } from "@angcapitalizeular/core";
import { AbstractEffect } from "@ddi-ng/store";
import { <%= capitalize(name) %>ActionTypes } from "./<%= capitalize(name) %>.actions.types";

@Injectable({
  providedIn: 'root'
})
export class <%= capitalize(name) %>Effects extends AbstractEffect {
constructor() {
  super();

  this.registerAfterEffects({
    type: `${<%= capitalize(name) %>ActionTypes.LISTAR}_FULFILLED`,
    effect: () => {}
  });
}
}
*/