/*import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Toastr } from '@core/types/toastr.type';
import { PrvDateUtil } from '@core/utils/prv-date.util';
import { PermissaoService } from '@ddi-ng/permissao';
import { TipoMensagemEnum } from 'app/shared/enums/tipe-mensagem.enum';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalPesquisaCfcComponent } from 'app/shared/components/modals/modal-pesquisa-cfc/modal-pesquisa-cfc.component';
import { Cfc } from '@core/cfc/types/cfc.dto';
import { AmbienteProperties } from '@core/ambiente-properties/types/ambiente-properties.dto';

@Component({
  selector: 'app-card-filtra-dinamica-<%= dasherize(name) %>',
  templateUrl: './card-filtra-dinamica-<%= dasherize(name) %>.component.html',
  styleUrls: ['./card-filtra-dinamica-<%= dasherize(name) %>.component.scss']
})
export class CardFiltra<%= classify(name) %>Component implements OnInit, OnChanges {

  @Input() filtrosOnBuffer: any = null;
  @Input() lista<%= classify(name) %>: <%= classify(name) %>Lista[] = [];
  @Input() listaTipoTurma: any[] = [];
  @Input() nomeCFCPesquisado: string = null;
  @Input() dataAmbiente: AmbienteProperties = null;

  @Output() requestCfcCriteria: EventEmitter<Function> = new EventEmitter();
  @Output() request<%= classify(name) %>Criteria: EventEmitter<Function> = new EventEmitter();

  @Output() toastrs: EventEmitter<Toastr[]> = new EventEmitter();
  @Output() filtros: EventEmitter<any> = new EventEmitter();
  @Output() clearListEvent: EventEmitter<void> = new EventEmitter();
  @Output() clearErrorsEvent: EventEmitter<any> = new EventEmitter();
  @Output() criteria: EventEmitter<any> = new EventEmitter();
  @Output() stopSubscription: EventEmitter<any> = new EventEmitter();
  @Output() pesquisarNomeCFCEvent: EventEmitter<any> = new EventEmitter();

  public criteriaOptions: { label: string, value: number }[] = [];
  public criteriaSelected: { label: string, value: number } = {} as { label: string, value: number };

  public toastrCardFiltra: Toastr = null;
  public localizarDisabled: boolean = true;
  public errors: Toastr[] = [];
  public formFields: any[] = [];
  public formData: any = {};
  public disabledFields: string[] = [];
  public invalidFields: string[] = [];
  public ultimoCodigoPesquisado = null;

  private readonly OPTIONS_MODAL: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  }

  private situacaoOptions: { label: string, value: number }[] = [];
  private tipoTurmaOptions: { label: string, value: number }[] = [];

  constructor(
    private permissaoService: PermissaoService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.criteriaOptions = this.mountCriteriaOptions();
    this.criteriaSelected = this.criteriaOptions[0];

    if(!!this.filtrosOnBuffer) {
      this.loadFiltrosOnBuffer();
      return;
    }

    this.handleCriteriaSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.situacaoOptions = this.mountSituacaoOptions();
    this.tipoTurmaOptions = this.mountTipoTurmaOptions(this.listaTipoTurma);

    const fillSelectionOptions: Map<number, Function> = new Map([
      [CriterioPesquisa<%= classify(name) %>Enum.VERSAO, this.fillSelectionOptionsVersao]
    ]);

    fillSelectionOptions.get(this.criteriaSelected.value)?.bind(this)();

    this.manageButtonEnablement(this.formData);
  }

  private loadFiltrosOnBuffer() {
    this.criteriaSelected = {
      label: this.criteriaOptions.find((option) => option.value === this.filtrosOnBuffer.criterioPesquisa).label,
      value: this.filtrosOnBuffer.criterioPesquisa
    };

    this.mountFormFieldsAfterLoadFiltersOnBuffer();

    this.mountFormDataAfterLoadFiltersOnBuffer();
  }

  public handleChange(field: string): void {
    if (field === 'cfc') {
      this.pesquisaNomeCFC();
    }

    this.clearList();
    this.manageButtonEnablement(this.formData);
  }

  public handleChangeModel(field: string): void{
    const fieldOptions: Map<string, Function> = new Map([
      ['cfc', () => {
        this.nomeCFCPesquisado = '';
        this.formData.listaSomenteAtivos = false;
        this.formData.nroIntTpTur = null;

        this.clearErrors();
        this.clearList();
        this.localizarDisabled = !this.validateRequiredFields(this.formData);
      }]
    ])

    return fieldOptions.get(field).bind(this)?.();
  }

  public handleClick(): void {
    this.clearErrors();

    if (!this.validateFields(this.formData)) {
      this.toastrs.emit(this.errors);
      return;
    }

    this.filtros.emit(this.toPayload(this.formData));
  }

  public handleSelect($event: string): void {
    const fieldOptions: Map<string, Function> = new Map([
      ['criteria', () => this.handleCriteriaSelection()]
    ]);

    this.clearList();

    fieldOptions.get($event)?.();

    this.manageButtonEnablement(this.formData);

    this.criteria.emit(this.criteriaSelected?.value);
  }

  private handleCriteriaSelection(): void {
    this.clearFormData();

    const formFieldsCriteria: Map<CriterioPesquisa<%= classify(name) %>Enum, Function> = new Map([
      [CriterioPesquisa<%= classify(name) %>Enum.VERSAO, this.handleVersaoCriteriaSelection],
      [CriterioPesquisa<%= classify(name) %>Enum.CFC, this.handleCfcCriteriaSelection]
    ]);

    this.formFields = formFieldsCriteria
      .get(this.criteriaSelected?.value)
      ?.bind(this)() || [];
  }

  private handleVersaoCriteriaSelection(): any[] {
    this.formData.situacao = this.situacaoOptions[1];
    return this.mountVersaoCriteriaFormFields();
  }

  private handleCfcCriteriaSelection(): any[] {
    this.cfcCriteriaEmitterHandler();
    return this.mountCfcCriteriaFormFields();
  }

  // Utilizar o método abaixo quando houver o campo de Pesquisa CFC
  public handleInput($event: Event): void {
    const input: HTMLInputElement = $event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  private fillSelectionOptionsVersao(): void {
    if (!!this.formData.situacao) {
      this.formData.situacao.label = this.situacaoOptions
        .find((option) => option.value === this.formData.situacao.value
        )?.label;
    }

    this.formData.situacao = this.situacaoOptions[1];
  }

   private mountCriteriaOptions(): { label: string, value: number }[] {
    const options: { label: string, value: number }[] = [];

    if (this.permissaoLista<%= classify(name) %>) {
      options.push({
          label: 'Versão',
          value: 1
      });
    };

    return options;
  }

  private cfcCriteriaEmitterHandler(): void {
    if (!this.getComboboxItems('tipoTurma').length) {
      this.requestCfcCriteria.emit(this.loadFormDataCfcCriteria.bind(this));
    }
  }

  private loadFormDataVersaoCriteria(): void {
    if (!this.filtrosOnBuffer || this.filtrosOnBuffer.criterioPesquisa != 1) {
      return;
    }

    this.formData = {
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.dataInicio) && {
        dataInicio: PrvDateUtil.toDate(this.filtrosOnBuffer.dataInicio)
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.dataFim) && {
        dataFim: PrvDateUtil.toDate(this.filtrosOnBuffer.dataFim)
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.descricao) && {
        dataInicio: this.filtrosOnBuffer.descricao
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.situacao) && {
        situacao: {
          label: this.getComboboxItems('situacao').find(
            (option) => option.value === this.filtrosOnBuffer.situacao)
            ?.label,
          value: this.filtrosOnBuffer.situacao
        }
      })
    };
  }

  private loadFormDataCfcCriteria(): void {
    if (!this.filtrosOnBuffer || this.filtrosOnBuffer.criterioPesquisa != 2) {
      return;
    }

    this.formData = {
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.codCfc) && {
        codCfc: this.filtrosOnBuffer.codCfc
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.tipoTurma) && {
        tipoTurma: {
          label: this.getComboboxItems('tipoTurma').find(
            (option) => option.value === this.filtrosOnBuffer.tipoTurma)
            ?.label,
          value: this.filtrosOnBuffer.tipoTurma
        }
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.somenteAtivos) && {
        somenteAtivos: this.filtrosOnBuffer.somenteAtivos
      })
    };
  }

  public mountFormFieldsAfterLoadFiltersOnBuffer(): void {
    const formFieldsCriteria: Map<CriterioPesquisa<%= classify(name) %>Enum, Function> = new Map([
      [CriterioPesquisa<%= classify(name) %>Enum.VERSAO, this.mountVersaoCriteriaFormFields],
      [CriterioPesquisa<%= classify(name) %>Enum.CFC, this.mountCfcCriteriaFormFields]
    ]);

    this.formFields = formFieldsCriteria
      .get(this.criteriaSelected?.value)
      ?.bind(this)() || [];
  }

  private mountFormDataAfterLoadFiltersOnBuffer(): void {
    const comboboxCriteriaOptions: Map<CriterioPesquisa<%= classify(name) %>Enum, Function> = new Map([
      [CriterioPesquisa<%= classify(name) %>Enum.VERSAO, this.loadFormDataVersaoCriteria],
      [CriterioPesquisa<%= classify(name) %>Enum.CFC, this.loadFormDataCfcCriteria]
    ]);

    comboboxCriteriaOptions
      .get(this.criteriaSelected?.value)
      ?.bind(this)();
  }

  private mountSituacaoOptions(): any {
    return [
      { label: 'Inativo', value: '0' },
      { label: 'Ativo', value: '1' },
      { label: 'Rascunho', value: '2' },
      { label: 'Rascunho Inválido', value: '3' },
      { label: 'Excluído', value: '9' }
    ];
  }

  private mountTipoTurmaOptions(listaTipoTurma: any[]): any {
    return listaTipoTurma.map((tipoTurma: any) => {
      return {
        label: tipoTurma.descrCurta,
        value: tipoTurma.nroIntTpTur
      }
    });
  }

  private mountVersaoCriteriaFormFields(): any[] {
    return [
      {
        fieldConfig: {
          field: 'calendar',
          id: 'periodo-inicial-field',
          type: 'text',
          maxlength: 10,
          mask: null
        },
        labelConfig: { id: 'periodo-inicial-label' },
        label: 'Data Início: ',
        placeholder: '',
        name: 'dataInicio'
      },
      {
        fieldConfig: {
          field: 'calendar',
          id: 'periodo-final-field',
          type: 'text',
          maxlength: 10,
          mask: null
        },
        labelConfig: { id: 'periodo-inicial-label' },
        label: 'Data Fim: ',
        placeholder: '',
        name: 'dataFim'
      },
      {
        fieldConfig: {
          field: 'input',
          id: 'descricao-field',
          type: 'text',
          maxlength: 80,
          mask: null
        },
        labelConfig: { id: 'descricao-label' },
        label: 'Descrição: *',
        placeholder: '',
        name: 'descricao'
      },
      {
        fieldConfig: {
          field: 'select',
          id: 'tipo-situacao-field',
          type: null,
          maxlength: null,
          mask: null
        },
        hasCheck: true,
        checkLabel: 'Somente Ativos',
        checkFieldName: 'somenteAtivos',
        labelConfig: { id: 'tipo-situacao-label' },
        label: 'Situação: *',
        placeholder: '',
        name: 'situacao'
      }
    ]
  }

  private mountCfcCriteriaFormFields(): any[] {
    return [
      {
        fieldConfig: {
          field: 'cfc'
        },
        checkFieldName: 'codCfc'
      },
      {
        fieldConfig: {
          field: 'select',
          id: 'tipo-turma-field',
          type: null,
          maxlength: null,
          mask: null
        },
        hasCheck: true,
        checkLabel: 'Somente Ativos',
        checkFieldName: 'somenteAtivos',
        labelConfig: { id: 'somente-ativos-label' },
        label: 'Tipo Turma: *',
        placeholder: '',
        name: 'tipoTurma'
      }
    ]
  }

  private toPayload(formData: any): any {
    if (this.criteriaSelected.value === 1) {
      return {
        criterioPesquisa: this.criteriaSelected.value,
        dataInicio: !!formData.dataInicio ? PrvDateUtil.toSAMD(formData.dataInicio) : null,
        dataFim: !!formData.dataFim ? PrvDateUtil.toSAMD(formData.dataFim) : null,
        descricao: formData.descricao,
        situacao: formData.situacao?.value.toString()
      }
    }
  }

  // Utilizar o método abaixo quando houver o campo de Pesquisa CFC
  public pesquisarCFC(): void {
    if(!!this.formData.somenteAtivos) {
      return;
    }

    if (!this.permissaoPesquisaNomeCFC) {
      this.registerError('Usuário não autorizado a ação: ACESSO-PUBLICO.', null);
      return;
    }

    this.stopSubscription.emit();
    const modalPesquisaCfc: NgbModalRef = this.modalService.open(ModalPesquisaCfcComponent, this.OPTIONS_MODAL);

    modalPesquisaCfc.result
    .then((cfcSelecionado: Cfc): void => {
      if(!cfcSelecionado) {
        return;
      }

      this.formData.codCfc = cfcSelecionado.codCliente;
      this.handleChange('cfc');
    })
    .catch(() => null);
  }

  // Utilizar o método abaixo quando houver o campo de Pesquisa CFC
  public pesquisaNomeCFC(): void {
    if(!this.formData.codCfc) {
      return;
    }

    if (!this.permissaoPesquisaNomeCFC) {
      this.registerError('Usuário não autorizado a ação: ACESSO-PUBLICO.', null);
      return;
    }

    this.formatCampoCfc();

    this.ultimoCodigoPesquisado = this.formData.codCfc;
    this.nomeCFCPesquisado = '';
    this.pesquisarNomeCFCEvent.emit(this.toPayload(this.formData));
  }

  // Utilizar o método abaixo quando houver o campo de Pesquisa CFC
  private formatCampoCfc(): void{
    if (this.formData.codCfc.length == 8){
      return;
    }

    const reg: RegExp = /^\d+$/;

    let numberSizeCfc: number = null;
    let chcTemp: string = this.formData.codCfc;

    if (this.dataAmbiente.ambiente == "PRO"){
      numberSizeCfc = 5;
    } else {
      numberSizeCfc = 2;
    }

    const sizeCfc = numberSizeCfc - this.formData.codCfc.length;

    for ( let i = 0; i < sizeCfc; i++ ){
      chcTemp = "0" + chcTemp
    }

    if ( chcTemp.length == numberSizeCfc && reg.test(chcTemp)){
      chcTemp = this.dataAmbiente.ambiente + "CHC" + chcTemp;
    } else {
      return
    }

    this.formData.codCfc = chcTemp;
  }

  private clearErrors(): void {
    this.errors = [];
    this.clearErrorsEvent.emit();
  }

  private registerError(errorMessage: string, fields: string[]): void {
    if (!!this.errors.find((error: any) => error.mensagem === errorMessage)) {
      return;
    }

    this.errors.push({
      mensagem: errorMessage,
      fields,
      status: TipoMensagemEnum.IMPEDITIVO
    });

    return;
  }

  private manageButtonEnablement(formData: any): void {
    this.localizarDisabled = !this.validateRequiredFields(formData);
  }

  private validateFields(formData: any) {
    if (this.criteriaSelected?.value === 1) {
      return this.validateFieldsVersao(formData);
    }
    return true;
  }

  private validateRequiredFields(formData: any): boolean {
    if (this.criteriaSelected?.value === 1) {
      return this.validateRequiredFieldsVersao(formData);
    }
    return false;
  }

  private validateRequiredFieldsVersao(formData: any): boolean {
    let retorno: boolean = true;
    const requiredFields = [
      'descricao',
      'situacao'
    ];

    requiredFields.forEach((element) => {
      if (['', null, undefined].includes(formData[element])) {
        retorno = false;
      }
    });

    return retorno;
  }

  private validateFieldsVersao(formData: any) {
    if (!!formData.dataInicio && !PrvDateUtil.isValidDate(formData.dataInicio)) {
      this.registerError('Data Início inválida.', null);
      return false;
    };

    if (!!formData.dataFim && !PrvDateUtil.isValidDate(formData.dataFim)) {
      this.registerError('Data Fim inválida.', null);
      return false;
    };

    if (!formData.dataInicio && !!formData.dataFim) {
      this.registerError('A data inicial deve ser informada.', null);
      return false;
    }

    if (!!formData.dataInicio && !formData.dataFim) {
      this.registerError('A data final deve ser informada.', null);
      return false;
    }

    if (!!formData.dataInicio && !!formData.dataFim) {
      if (formData.dataFim < formData.dataInicio) {
        this.registerError('A data final deve ser maior ou igual a data inicial.', null);
        return false;
      }
    };

    return true;
  }

  private clearList(): void {
    this.clearListEvent.emit();
  }

  private clearFormData(): void {
    this.formData.dataInicio = null;
    this.formData.dataFim = null;
    this.formData.descricao = null;
    this.formData.situacao = null;
    this.formData.codCfc = null;
    this.formData.tipoTurma = null;
    this.formData.somenteAtivos = false;
    this.formData.banca = null;
    this.formData.municipio = null;
    this.nomeCFCPesquisado = null;
  }

  public getComboboxItems(field: string): any[] {
    const fieldOptions: Map<string, any[]> = new Map([
      ['situacao', this.situacaoOptions],
      ['tipoTurma', this.tipoTurmaOptions]
    ]);

    return fieldOptions.get(field);
  }

  public isDisabled(field: string): boolean {
    return this.disabledFields.includes(field) || this.disabledFields.includes('all');
  }

  public isInvalid(field: string): boolean {
    return this.invalidFields.includes(field);
  }

  get permissaoLista<%= classify(name) %>(): boolean {
    return this.permissaoService.validarPermissao('VERSAOCFGAGENDA', 'LISTA', 'PRV');
  }

  get permissaoListaDemaisCriterios(): boolean {
    return this.permissaoService.validarPermissao('AGECFGSEL', 'EXECUTAR', 'PRV');
  }

  get permissaoPesquisaNomeCFC(): boolean {
    return this.permissaoService.validarPermissao('ACESSO', 'PUBLICO', 'PRV');
  }
}*/
