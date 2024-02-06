/*import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { <%= classify(name) %>Actions } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions';
import { <%= classify(name) %>ActionTypes } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions.types';
import { <%= classify(name) %>Store } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.store';
import { <%= classify(name) %>Lista } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.dto';
import { <%= classify(name) %>State } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.state';
import { PrvRoutesLibrary } from '@core/prv-routes/prv-routes.library';
import { Toastr } from '@core/types/toastr.type';
import { ErrorHandlerUtil } from '@core/utils/error-handler.util';
import { PermissaoService } from '@ddi-ng/permissao';
import { TipoMensagemEnum } from 'app/shared/enums/tipe-mensagem.enum';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-<%= dasherize(name) %>-component',
    templateUrl: './lista-<%= dasherize(name) %>.component.html',
    styleUrls: ['./lista-<%= dasherize(name) %>.component.scss'],
})
export class Lista<%= classify(name) %>Component implements OnInit, OnDestroy {

  public lista<%= classify(name) %>: <%= classify(name) %>Lista[] = [];
  public toastrs: Toastr[] = [];
  public filtros: any = null;
  //------ << Atributos de Lista <%= classify(name) %> para o tipo Dominio >> ------
  // Objetivo: preencher os campos DropDown com valores pré-definidos
  //listaTipo<%= classify(name) %>Dominio: Dominio[];

  public navigation = [
    {
      text: 'Início',
      onClick: () => this.router.navigate(['/home'])
    },
    {
      text: 'Pesquisa de <%= classify(name) %>',
      onClick: () => null
    }
  ];

  public pageInfos: any = {
    pageSize: 10,
    pageNum: 1
  };

  private readonly subscription: Subscription = new Subscription();
  private <%= dasherize(name) %>Subscription: Subscription = null;

  //------ << Descomentar para o uso de Modal >> --------
  //Objetivo: Configurar modo de exibição
  //private readonly OPTIONS_MODAL: NgbModalOptions = {
  //  backdrop: 'static',
  //  keyboard: false,
  //  size: 'md'
  //}

  constructor(
    private router: Router,
    private permissaoService: PermissaoService,
    private <%= dasherize(name) %>Actions: <%= classify(name) %>Actions,
    private <%= dasherize(name) %>Store: <%= classify(name) %>Store,
    //private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getPaginationBuffer();
    this.getFilterBuffer();
    this.refreshList();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  private isAtiva(<%= dasherize(name) %>: <%= classify(name) %>Lista): boolean {
    return <%= dasherize(name) %>.situacao == 'Ativo';
  }

  private atualiza<%= classify(name) %>OnTable(): void {
    this.lista<%= classify(name) %>
      .forEach((<%= dasherize(name) %>: <%= classify(name) %>Lista) => {
        Object.assign(<%= dasherize(name) %>, {
          isPodeDesativar: this.isAtiva(<%= dasherize(name) %>),
          isPodeReativar: !this.isAtiva(<%= dasherize(name) %>)
        })
      });
  }

  public clearToastr(): void {
    this.toastrs = [];
  }

  //------ << Descomentar para o uso de Modal >> --------
  //public handleNova<%= classify(name) %>Clicked(): void {
  //  const modal: NgbModalRef = this.modalService.open(ModalIncluir<%= classify(name) %>Component, this.OPTIONS_MODAL);
  //
  //  modal.result
  //    .then(() => {
  //      this.exibeToastr(
  //        '<%= classify(name) %> foi incluída.',
  //        TipoMensagemEnum.SUCESSO
  //      );
  //
  //      this.requestLista<%= classify(name) %>();
  //    })
  //    .catch(() => null);
  //}

  public handleClearErrors(): void {
    this.clearToastr();
  }

  public handleToastrs($event: Toastr | Toastr[]): void {
    if (!$event) {
      return;
    }

    const toastrs: Toastr[] = Array.isArray($event) ? $event : [$event];

    toastrs.forEach((toastr: Toastr) => {
      this.exibeToastr(toastr.mensagem, toastr.status);
    });

    return;
  }

  public redirectEvent($event: any): void {
    //this.requestImprimirBanca();
  }

  private exibeToastr(mensagem: string, status: TipoMensagemEnum): void {
    if (this.toastrs.find((toastr) => toastr.mensagem === mensagem)) {
      return;
    }
    this.toastrs.push({
      mensagem,
      status
    });

    window.scroll(0, 0);
    return;
  }

  private setPaginationBuffer(): void {
    localStorage.setItem('paginationBuffer', JSON.stringify({ '<%= classify(name) %>': this.pageInfos }));
  }

  private getPaginationBuffer(): void {
    const paginationBuffer: any = JSON.parse(localStorage.getItem('paginationBuffer'));

    if (!paginationBuffer?.['<%= classify(name) %>']) {
      return;
    }

    this.pageInfos = {
      ...this.pageInfos,
      ...paginationBuffer['<%= classify(name) %>']
    };

    return;
  }

  private setFilterBuffer(): void {
    localStorage.setItem('filterBuffer', JSON.stringify({ '<%= classify(name) %>': this.filtros }));
  }

  private getFilterBuffer(): void {
    const filterBuffer: any = JSON.parse(localStorage.getItem('filterBuffer'));

    if (!filterBuffer?.['<%= classify(name) %>']) {
      return;
    }

    this.filtros = {
      ...this.filtros,
      ...filterBuffer['<%= classify(name) %>']
    };

    return;
  }

  private requestLista<%= classify(name) %>(): Promise<void> {
    this.<%= dasherize(name) %>Subscription?.unsubscribe();
    this.<%= dasherize(name) %>Actions.listaPesquisar<%= classify(name) %>(
      this.pageInfos.pageNum,
      this.pageInfos.pageSize,
      this.filtros.nome,
      this.filtros.situacao
    );

    return new Promise((resolve, reject) => {
      this.<%= dasherize(name) %>Subscription = this.<%= dasherize(name) %>Store
        .state$
        .subscribe((data: <%= classify(name) %>State) => {
          if (data.<%= classify(name) %>.hasErrors) {
            const rawMessage: string = data.<%= classify(name) %>.errorMessage;

            this.exibeToastr(ErrorHandlerUtil.getMessage(rawMessage), ErrorHandlerUtil.getStatus(rawMessage));
            this.<%= dasherize(name) %>Subscription?.unsubscribe();
            reject();
            return;
          }
          if (data.<%= classify(name) %>.data) {
            const payload: <%= classify(name) %>Lista | <%= classify(name) %>Lista[] = data.<%= classify(name) %>.data

            this.lista<%= classify(name) %> = Array.isArray(payload) ? payload : [payload];
            this.<%= dasherize(name) %>Subscription?.unsubscribe();
            this.atualiza<%= classify(name) %>OnTable();
            resolve();
          }
      })
    });
  }

  public handleFiltros($event: any): void {
    const gerenciaFiltros: Function = (filtros: any) => {
      this.pageInfos.pageSize = this.pageInfos.pageSize || 10;
      this.pageInfos.pageNum = 1;

      this.setPaginationBuffer();

      return {
        pageSize: this.pageInfos.pageSize,
        pageNum: this.pageInfos.pageNum,
        nome: filtros.nome,
        situacao: [undefined, null].includes(filtros.situacao)
          ? null
          : filtros.situacao,
        regiaoExames: [undefined, null].includes(filtros.regiaoExames)
          ? null
          : filtros.regiaoExames,
        qtdExaminador: filtros.qtdExaminador,
        distribuicao: [undefined, null].includes(filtros.distribuicao)
          ? null
          : filtros.distribuicao
      }
    }

    this.filtros = gerenciaFiltros($event);

    this.requestLista<%= classify(name) %>();

    this.clearToastr();
  }

  public handlePagination($event: any) {
    const gerenciaFiltros: Function = (filtros: any) => {
      this.pageInfos.pageSize = filtros.pageSize
        ? filtros.pageSize
        : this.filtros?.pageSize || this.pageInfos.pageSize;
      this.pageInfos.pageNum = filtros.pageNum
        ? filtros.pageNum
        : this.filtros?.pageNum || this.pageInfos.pageNum;

      this.setPaginationBuffer();

      return {
        ...this.filtros,
        pageSize: this.pageInfos.pageSize,
        pageNum: this.pageInfos.pageNum
      };
    };

    this.filtros = gerenciaFiltros($event);

    this.requestLista<%= classify(name) %>();

    window.scrollTo(0, 0);
  }

  public handleRowCLick(nroInt<%= classify(name) %>: number): void {
    this.consultar<%= classify(name) %>(nroInt<%= classify(name) %>);
  }

  public menuClickHandler($event: any): void {
    const menuOptions: Map<<%= classify(name) %>ActionTypes, Function> = new Map([
      [<%= classify(name) %>ActionTypes.CONSULTAR, () => this.consultar<%= classify(name) %>($event.<%= dasherize(name) %>.nroIntRota)],
      //[<%= classify(name) %>ActionsTypes.EXCLUIR, () => this.exibeModalConfirmacaoDesativar<%= classify(name) %>($event.nroIntRota)],
      //[<%= classify(name) %>ActionsTypes.ALTERAR, () => this.exibeModalConfirmacaoReativar<%= classify(name) %>($event.nroIntRota)]
    ])

    this.clearToastr();

    return menuOptions.get($event.menuOption)?.bind(this)();
  }

  private consultar<%= classify(name) %>(nroInt<%= classify(name) %>: number): void {
    this.router.navigate(
      [PrvRoutesLibrary.FALTA.CONSULTA.setPathParams(nroInt<%= classify(name) %>).getUrl()]
    );
  }


  public refreshList(): void {
    if (!this.filtros) {
      return;
    }

    this.requestLista<%= classify(name) %>();
  }

  get permissaoConsulta(): boolean {
    return this.permissaoService.validarPermissao('ROTA', 'LISTA', 'PRV');
  }

  get permissaoInclusao(): boolean {
    return this.permissaoService.validarPermissao('ROTA', 'INCLUI', 'PRV');
  }

  get isLoading(): boolean {
    return (
      this.<%= dasherize(name) %>Store.state.<%= classify(name) %>.isLoading
    );
  }
  
  
}*/