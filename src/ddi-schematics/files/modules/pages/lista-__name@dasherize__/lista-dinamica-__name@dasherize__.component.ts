/*import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmbientePropertiesActions } from '@core/ambiente-properties/store/ambiente-properties.actions';
import { AmbientePropertiesStore } from '@core/ambiente-properties/store/ambiente-properties.store';
import { AmbienteProperties } from '@core/ambiente-properties/types/ambiente-properties.dto';
import { AmbientePropertiesState } from '@core/ambiente-properties/types/ambiente-properties.state';
import { CfcActions } from '@core/cfc/store/cfc.actions';
import { CfcStore } from '@core/cfc/store/cfc.store';
import { Cfc } from '@core/cfc/types/cfc.dto';
import { CfcState } from '@core/cfc/types/cfc.state';
import { <%= classify(name) %>Actions } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions';
import { <%= classify(name) %>ActionTypes } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions.types';
import { <%= classify(name) %>Store } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.store';
import { <%= classify(name) %>Lista, CriterioPesquisa<%= classify(name) %>Enum } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.dto';
import { <%= classify(name) %>State } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.state';
import { PrvRoutesLibrary } from '@core/prv-routes/prv-routes.library';
import { Toastr } from '@core/types/toastr.type';
import { ErrorHandlerUtil } from '@core/utils/error-handler.util';
import { PermissaoService } from '@ddi-ng/permissao';
import { TipoMensagemEnum } from 'app/shared/enums/tipe-mensagem.enum';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-<%= dasherize(name) %>-component',
    templateUrl: './lista-dinamica-<%= dasherize(name) %>.component.html',
    styleUrls: ['./lista-dinamica-<%= dasherize(name) %>.component.scss'],
})
export class Lista<%= classify(name) %>Component implements OnInit, OnDestroy {

  public lista<%= classify(name) %>: <%= classify(name) %>Lista[] = [];
  public toastrs: Toastr[] = [];
  public filtros: any = null;
  public filtrosOnBuffer: any = null;
  public criterioPesquisa: number = null;
  public genericList: <%= classify(name) %>Lista[] = [];
  public dataAmbiente: AmbienteProperties = null;
  public nomeCFCPesquisado: any = null;
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

  private <%= classify(name) %>Subscription: Subscription = null;
  private dadosCFCSubscription: Subscription = null;
  private urlAmbienteSubscription: Subscription = null

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
    private <%= classify(name) %>Actions: <%= classify(name) %>Actions,
    private <%= classify(name) %>Store: <%= classify(name) %>Store,
    private cfcActions: CfcActions,
    private cfcStore: CfcStore,
    private ambientePropertiesActions: AmbientePropertiesActions,
    private ambientePropertiesStore: AmbientePropertiesStore,
    //private modalService: NgbModal
  ) { }

  public async ngOnInit(): Promise<void> {
    this.getDadosAmbiente();
    this.getPaginationBuffer();
    this.getFilterBuffer();

    if (this.filtrosOnBuffer != null) {
      await this.dispatchRequestsOnBufferLoad();
      await this.dispatchRequestFiltros();
    }
  }

  public ngOnDestroy(): void {
    this.setFilterBuffer();
  }

  private async dispatchRequestsOnBufferLoad(): Promise<void> {
    const criteriaOptions: Map<CriterioPesquisa<%= classify(name) %>Enum, Function> = new Map([
      [CriterioPesquisa<%= classify(name) %>Enum.VERSAO, null],
      [CriterioPesquisa<%= classify(name) %>Enum.CFC, this.requestCfcCriteria]
    ]);

    return await criteriaOptions
      .get(this.criterioPesquisa)
      ?.bind(this)();
  }

  public async requestCfcCriteria($event: Function = null): Promise<void> {
    const requestMethods: Function[] = [
      // Acrescentar requests necessárias para popular combobox conforme critério
      //this.requestTipoTurma
    ]

    for(let requestMethod of requestMethods) {
      await requestMethod.bind(this)();
    }

    $event?.();
  }

  private async dispatchRequestFiltros(): Promise<void> {
    const criteriaOptions: Map<number, Function> = new Map([
      [CriterioPesquisa<%= classify(name) %>Enum.VERSAO, this.requestLista<%= classify(name) %>]
    ]);

    const method: Function = criteriaOptions.get(this.filtros.criterioPesquisa);

    await method?.bind(this)();
  }

  private requestLista(criterio: number): Promise<void> {
    this.<%= classify(name) %>Subscription?.unsubscribe();
    this.<%= classify(name) %>Actions.listaPesquisar<%= classify(name) %>(
      criterio,
      this.pageInfos.pageNum,
      this.pageInfos.pageSize,
      this.filtros.nome,
      this.filtros.situacao
    );

    return new Promise((resolve, reject) => {
      this.<%= classify(name) %>Subscription = this.<%= classify(name) %>Store
        .state$
        .subscribe((data: <%= classify(name) %>State) => {
          if (data.<%= classify(name) %>.hasErrors) {
            const rawMessage: string = data.<%= classify(name) %>.errorMessage;

            this.exibeToastr(ErrorHandlerUtil.getMessage(rawMessage), ErrorHandlerUtil.getStatus(rawMessage));
            this.<%= classify(name) %>Subscription?.unsubscribe();
            reject();
            return;
          }
          if (data.<%= classify(name) %>.data) {
            const payload: <%= classify(name) %>Lista | <%= classify(name) %>Lista[] = data.<%= classify(name) %>.data

            this.genericList = Array.isArray(payload) ? payload : [payload];
            this.<%= classify(name) %>Subscription?.unsubscribe();
            resolve();
          }
      })
    });
  }

  private async requestLista<%= classify(name) %>(): Promise<void> {
    await this.requestLista(1);
    this.lista<%= classify(name) %> = this.genericList;
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

  public handleCriteria($event): void {
    this.criterioPesquisa = $event;

    this.filtros = this.carregaFiltros({
      criterioPesquisa: this.criterioPesquisa
    });
  }

  public handleFiltros(filtros: any): void{
    this.clearToastr();

    this.criterioPesquisa = filtros.criterioPesquisa;

    this.filtros = this.carregaFiltros(filtros);

    this.dispatchRequestFiltros();
  }

  public handleClearList(): void {
    this.lista<%= classify(name) %> = [];
    this.pageInfos = {
      pageSize: 10,
      pageNum: 1
    };
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

  public handleClearErrors(): void {
    this.clearToastr();
  }

  public handleRowCLick($event: any): void {
    this.router.navigate([PrvRoutesLibrary.<%= classify(name) %>.CONSULTA.setPathParams($event).getUrl()]);
  }

  public handlePagination($event: any) {
    const gerenciaFiltros: Function = (pageInfos: any) => {
      this.setPaginationBuffer();

      return {
        ...this.pageInfos,
        pageSize: pageInfos.pageSize ? pageInfos.pageSize : this.pageInfos?.pageSize,
        pageNum: pageInfos.pageNum ? pageInfos.pageNum : this.pageInfos?.pageNum
      };
    };

    this.pageInfos = gerenciaFiltros($event);

    this.dispatchRequestFiltros();

    window.scrollTo(0, 0);
  }

  // Utilizar o método abaixo quando houver o campo de Pesquisa CFC
  public handlePesquisarNomeCFC($event){
    this.dadosCFCSubscription?.unsubscribe();
    this.nomeCFCPesquisado = '';

    this.cfcActions.pesquisa($event.codCfc);
    this.dadosCFCSubscription = this.cfcStore.state$.subscribe((data: CfcState) => {
      if (data.cfc.data) {
        const payload: Cfc | Cfc[] = data.cfc.data;
        const nomePesquisadoTemp = Array.isArray(payload) ? payload[0]?.txtNomeFantasia.toUpperCase() : payload?.txtNomeFantasia.toUpperCase();
        if(['', null, undefined, false, '{}'].includes(nomePesquisadoTemp) || (Array.isArray(payload) && payload.length == 0)){
          this.nomeCFCPesquisado = 'CFC não localizado';
          return;
        }
        this.nomeCFCPesquisado = nomePesquisadoTemp;

        this.dadosCFCSubscription?.unsubscribe();

        return;
      }
      else if (data.cfc.hasErrors){
        this.nomeCFCPesquisado = 'CFC não localizado';
        return;
      }
    });
  }

  public redirectEvent($event: any): void {
    //this.requestImprimir<%= classify(name) %>();
  }

  private carregaFiltros(filtros: any): any {
    switch (filtros.criterioPesquisa) {
      case CriterioPesquisa<%= classify(name) %>Enum.VERSAO:
        return {
          pageSize: this.pageInfos?.pageSize || 10,
          pageNum: this.pageInfos?.pageNum || 1,
          criterioPesquisa: filtros.criterioPesquisa,
          dataInicio: filtros.dataInicio,
          dataFim: filtros.dataFim,
          descricao: filtros.descricao,
          situacao: filtros.situacao
        }
    }
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

  public clearToastr(): void {
    this.toastrs = [];
  }

  private setPaginationBuffer(): void {
    localStorage.setItem('paginationBuffer', JSON.stringify({ '<%= dasherize(name) %>': this.pageInfos }));
  }

  private getPaginationBuffer(): void {
    const paginationBuffer: any = JSON.parse(localStorage.getItem('paginationBuffer'));

    if (!paginationBuffer?.['<%= dasherize(name) %>']) {
      return;
    }

    this.pageInfos = {
      ...this.pageInfos,
      ...paginationBuffer['<%= dasherize(name) %>']
    };

    return;
  }

  private setFilterBuffer(): void {
    localStorage.setItem('filterBuffer', JSON.stringify({ '<%= dasherize(name) %>': this.filtros }));
  }

  private getFilterBuffer(): void {
    const filterBuffer: any = JSON.parse(localStorage.getItem('filterBuffer'));

    if (!filterBuffer?.['<%= dasherize(name) %>']) {
      return;
    }

    this.filtros = {
      ...this.filtros,
      ...filterBuffer['<%= dasherize(name) %>']
    };

    return;
  }

  // Utilizar o método abaixo quando houver o campo de Pesquisa CFC
  private getDadosAmbiente(): void {
    this.urlAmbienteSubscription?.unsubscribe();

    this.ambientePropertiesActions.consulta();

    this.urlAmbienteSubscription = this.ambientePropertiesStore.state$.subscribe(
      (dataAmbiente: AmbientePropertiesState) => {
        if (dataAmbiente.ambienteProperties.hasErrors) {
          const rawMessage = dataAmbiente.ambienteProperties.errorMessage;
          this.exibeToastr(
            ErrorHandlerUtil.getMessage(rawMessage),
            ErrorHandlerUtil.getStatus(rawMessage)
          );
          return;
        }
        if (dataAmbiente.ambienteProperties.data) {
          const payload: AmbienteProperties | AmbienteProperties[] = dataAmbiente.ambienteProperties.data;
          this.dataAmbiente = Array.isArray(payload) ? payload[0] : payload;
        }
      }
    );
  }

  public menuClickHandler($event: any): void {
    const menuOptions: Map<<%= classify(name) %>ActionTypes, Function> = new Map([
      //[<%= classify(name) %>ActionTypes.CONSULTAR, () => this.consultar<%= classify(name) %>($event.<%= classify(name) %>.nroIntVersao)],
      //[<%= classify(name) %>ActionsTypes.EXCLUIR, () => this.exibeModalConfirmacaoDesativar<%= classify(name) %>($event.nroIntVersao)],
      //[<%= classify(name) %>ActionsTypes.ALTERAR, () => this.exibeModalConfirmacaoReativar<%= classify(name) %>($event.nroIntVersao)]
    ])

    this.clearToastr();

    return menuOptions.get($event.menuOption)?.bind(this)();
  }

  get permissaoConsulta(): boolean {
    return this.permissaoService.validarPermissao('ROTA', 'LISTA', 'PRV');
  }

  get isLoading(): boolean {
    return (
      this.<%= classify(name) %>Store.state.<%= classify(name) %>.isLoading
    );
  }
}*/
