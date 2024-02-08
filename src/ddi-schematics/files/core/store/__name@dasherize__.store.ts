/*import { camelize } from "@angular-devkit/core/src/utils/strings";
import { Injectable } from "@angular/core";
import { AbstractStore } from "@ddi-ng/store";
import { <%= classify(name) %>State } from "../types/<%= dasherize(name) %>.state";
import { <%= classify(name) %>ActionTypes } from "./<%= dasherize(name) %>.actions.types";

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Store extends AbstractStore<<%= classify(name) %>State> {
static defaultState: <%= classify(name) %>State = {
  <%= camelize(name) %>: {
    data: undefined,
    isLoading: false,
    hasErrors: false,
    errorMessage: ''
  }
};

constructor() {
  super(<%= classify(name) %>Store.defaultState, {
    persist: { session: true, name: '<%= classify(name) %>Store' }
  });
}

reducer({ state, type, payload }) {
  const stores: any = {
    pending: {
      <%= classify(name) %>: {
        data: undefined,
        isLoading: true,
        hasErrors: false,
        errorMessage: ''
      }
    },
    fulfilled: {
      <%= classify(name) %>: {
        data: payload,
        isLoading: false,
        hasErrors: false,
        errorMessage: ''
      }
    },
    rejected: {
      <%= classify(name) %>: {
        data: undefined,
        isLoading: false,
        hasErrors: true,
        errorMessage: (payload?.status >= 400 && payload?.status < 500 && payload?.error) || ''
      }
    }
  }
  const options: any = {
    [`${<%= classify(name) %>ActionTypes.PESQUISAR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.PESQUISAR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.PESQUISAR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= classify(name) %>ActionTypes.LISTAR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.LISTAR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.LISTAR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= classify(name) %>ActionTypes.CONSULTAR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.CONSULTAR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.CONSULTAR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= classify(name) %>ActionTypes.INCLUIR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.INCLUIR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.INCLUIR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= classify(name) %>ActionTypes.ALTERAR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.ALTERAR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.ALTERAR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= classify(name) %>ActionTypes.EXCLUIR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.EXCLUIR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.EXCLUIR}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= classify(name) %>ActionTypes.RELATORIO}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.RELATORIO}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.RELATORIO}_REJECTED`]: () => ({ ...stores.rejected }),
    [`${<%= classify(name) %>ActionTypes.IMPRIMIR}_PENDING`]: () => ({ ...stores.pending }),
    [`${<%= classify(name) %>ActionTypes.IMPRIMIR}_FULFILLED`]: () => ({ ...stores.fulfilled }),
    [`${<%= classify(name) %>ActionTypes.IMPRIMIR}_REJECTED`]: () => ({ ...stores.rejected })    
  }

  return !!options[type]
    ? options[type]()
    : state;
}
}*/