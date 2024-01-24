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
  private faltaSubscription: Subscription = null;

  constructor(
    private router: Router,
    private permissaoService: PermissaoService,
    private faltasActions: <%= classify(name) %>Actions,
    private faltasStore: <%= classify(name) %>Store,
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

  private isAtiva(falta: <%= classify(name) %>Lista): boolean {
    return falta.situacao == 'Ativo';
  }

  private atualizaBancasOnTable(): void {
    this.lista<%= classify(name) %>
      .forEach((falta: <%= classify(name) %>Lista) => {
        Object.assign(falta, {
          isPodeDesativar: this.isAtiva(falta),
          isPodeReativar: !this.isAtiva(falta)
        })
      });
  }

  public clearToastr(): void {
    this.toastrs = [];
  }

  public handleNovaFaltaClicked(): void {
    const modal: NgbModalRef = this.modalService.open(ModalIncluirBancaComponent, this.OPTIONS_MODAL);

    modal.result
      .then(() => {
        this.exibeToastr(
          'Banca foi incluída.',
          TipoMensagemEnum.SUCESSO
        );

        this.requestListaBancas();
      })
      .catch(() => null);
    }

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
      localStorage.setItem('paginationBuffer', JSON.stringify({ 'bancas': this.pageInfos }));
    }
  
    private getPaginationBuffer(): void {
      const paginationBuffer: any = JSON.parse(localStorage.getItem('paginationBuffer'));
  
      if (!paginationBuffer?.['bancas']) {
        return;
      }
  
      this.pageInfos = {
        ...this.pageInfos,
        ...paginationBuffer['bancas']
      };
  
      return;
    }
  
    private setFilterBuffer(): void {
      localStorage.setItem('filterBuffer', JSON.stringify({ 'bancas': this.filtros }));
    }
  
    private getFilterBuffer(): void {
      const filterBuffer: any = JSON.parse(localStorage.getItem('filterBuffer'));
  
      if (!filterBuffer?.['bancas']) {
        return;
      }
  
      this.filtros = {
        ...this.filtros,
        ...filterBuffer['bancas']
      };
  
      return;
    }
  
    private requestLista<%= classify(name) %>(): Promise<void> {
      this.faltaSubscription?.unsubscribe();
      this.faltasActions.listaPesquisar<%= classify(name) %>(
        this.pageInfos.pageNum,
        this.pageInfos.pageSize,
        this.filtros.nome,
        this.filtros.situacao,
        this.filtros.regiaoExames,
        this.filtros.qtdExaminador,
        this.filtros.distribuicao
      );
  
      return new Promise((resolve, reject) => {
        this.faltaSubscription = this.faltasStore
          .state$
          .subscribe((data: <%= classify(name) %>State) => {
            if (data.<%= dasherize(name) %>.hasErrors) {
              const rawMessage: string = data.<%= dasherize(name) %>.errorMessage;
  
              this.exibeToastr(ErrorHandlerUtil.getMessage(rawMessage), ErrorHandlerUtil.getStatus(rawMessage));
              this.faltaSubscription?.unsubscribe();
              reject();
              return;
            }
            if (data.<%= dasherize(name) %>.data) {
              const payload: <%= classify(name) %>Lista | <%= classify(name) %>Lista[] = data.<%= dasherize(name) %>.data
  
              this.lista<%= classify(name) %> = Array.isArray(payload) ? payload : [payload];
              this.faltaSubscription?.unsubscribe();
              this.atualizaBancasOnTable();
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
  
    public handleRowCLick(nroIntRota: number): void {
      this.consultarBanca(nroIntRota);
    }
  
    public menuClickHandler($event: any): void {
      const menuOptions: Map<<%= classify(name) %>ActionTypes, Function> = new Map([
        [<%= classify(name) %>ActionTypes.CONSULTAR, () => this.consultarBanca($event.banca.nroIntRota)],
        //[<%= classify(name) %>ActionsTypes.EXCLUIR, () => this.exibeModalConfirmacaoDesativarBanca($event.nroIntRota)],
        //[<%= classify(name) %>ActionsTypes.ALTERAR, () => this.exibeModalConfirmacaoReativarBanca($event.nroIntRota)]
      ])
  
      this.clearToastr();
  
      return menuOptions.get($event.menuOption)?.bind(this)();
    }
  
    private consultarBanca(nroIntBanca: number): void {
      this.router.navigate(
        [PrvRoutesLibrary.FALTA.CONSULTA.setPathParams(nroIntBanca).getUrl()]
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
        this.faltasStore.state.<%= dasherize(name) %>.isLoading
      );
    }
  
  
}*/