/*import { Injectable } from "@angular/core";
import { AbstractStore } from "@ddi-ng/store";
import { <%= capitalize(name) %>State } from "../types/<%= capitalize(name) %>.state";
import { <%= capitalize(name) %>ActionTypes } from "./<%= capitalize(name) %>.actions.types";

@Injectable({
  providedIn: 'root'
})
export class <%= capitalize(name) %>Store extends AbstractStore<<%= capitalize(name) %>State> {
static defaultState: <%= capitalize(name) %>State = {
  <%= capitalize(name) %>: {
    data: undefined,
    isLoading: false,
    hasErrors: false,
    errorMessage: ''
  }
};

constructor() {
  super(<%= capitalize(name) %>Store.defaultState, {
    persist: { session: true, name: '<%= capitalize(name) %>Store' }
  });
}

reducer({ state, type, payload }) {
  const stores: any = {
    pending: {
      <%= capitalize(name) %>: {
        data: undefined,
        isLoading: true,
        hasErrors: false,
        errorMessage: ''
      }
    },
    fulfilled: {
      <%= capitalize(name) %>: {
        data: payload,
        isLoading: false,
        hasErrors: false,
        errorMessage: ''
      }
    },
    rejected: {
      <%= capitalize(name) %>: {
        data: undefined,
        isLoading: false,
        hasErrors: true,
        errorMessage: (payload?.status >= 400 && payload?.status < 500 && payload?.error) || ''
      }
    }
  }
  const options: any = {
    [`${<%= capitalize(name) %>ActionTypes.LISTAR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= capitalize(name) %>ActionTypes.LISTAR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= capitalize(name) %>ActionTypes.LISTAR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= capitalize(name) %>ActionTypes.CONSULTAR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= capitalize(name) %>ActionTypes.CONSULTAR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= capitalize(name) %>ActionTypes.CONSULTAR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= capitalize(name) %>ActionTypes.INCLUIR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= capitalize(name) %>ActionTypes.INCLUIR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= capitalize(name) %>ActionTypes.INCLUIR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= capitalize(name) %>ActionTypes.ALTERAR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= capitalize(name) %>ActionTypes.ALTERAR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= capitalize(name) %>ActionTypes.ALTERAR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= capitalize(name) %>ActionTypes.EXCLUIR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= capitalize(name) %>ActionTypes.EXCLUIR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= capitalize(name) %>ActionTypes.EXCLUIR}_REJECTED`]: () => ({ ...stores.rejected })
  }

  return !!options[type]
    ? options[type]()
    : state;
}
}*/