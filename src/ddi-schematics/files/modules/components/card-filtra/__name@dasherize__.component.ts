/*import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Toastr } from '@core/types/toastr.type';
import { TipoMensagemEnum } from 'app/shared/enums/tipe-mensagem.enum';

@Component({
  selector: 'app-card-filtra-<%= dasherize(name) %>',
  templateUrl: './card-filtra-<%= dasherize(name) %>.component.html',
  styleUrls: ['./card-filtra-<%= dasherize(name) %>.component.scss']
})
export class CardFiltra<%= capitalize(name) %>Component implements OnInit, OnChanges {

  @Input() listaRegiaoExame: RegiaoExame[] = [];
  @Input() filtrosOnBuffer: any = null;

  @Output() clearErrorsEvent: EventEmitter<any> = new EventEmitter();
  @Output() toastrs: EventEmitter<Toastr[]> = new EventEmitter();
  @Output() filtros: EventEmitter<any> = new EventEmitter();
  @Output() clearListEvent: EventEmitter<void> = new EventEmitter();

  public toastrCardFiltra: Toastr = null;
  public localizarDisabled: boolean = true;
  public errors: Toastr[] = [];

  public formFields: any = {
    nome: null,
    situacao: null,
    regiaoExames: null,
    qtdExaminador: null,
    distribuicao: null
  };

  public regiaoExamesOptions: { label: string, value: number }[] = [];
  public situacaoOptions: any[] = [
    { label: 'Ativo', value: 'S' },
    { label: 'Inativo', value: 'N' }
  ];
  public distribuicaoOptions: any[] = [
    { label: 'Sim', value: 'S' },
    { label: 'Não', value: 'N' }
  ];

  constructor() { }

  ngOnInit() {
    this.toastrCardFiltra = {
      mensagem: "Informe pelo menos um critério de pesquisa",
      status: TipoMensagemEnum.INFORMATIVO
    }

    this.formFields.situacao = this.situacaoOptions[0];
    this.formFields.distribuicao = this.distribuicaoOptions[0];

    this.loadFiltrosOnBuffer();

    this.handleChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.regiaoExamesOptions = this.mountRegiaoExameOptions(this.listaRegiaoExame);

    if (!!this.formFields.regiaoExames) {
      this.formFields.regiaoExames.label = this.regiaoExamesOptions.find(
        (option) => option.value === this.formFields.regiaoExames.value
      )?.label;
    }
  }

  private mountRegiaoExameOptions(listaRegiaoExame: RegiaoExame[]): any {
    return listaRegiaoExame.map((regiaoExame: RegiaoExame) => {
      return {
        label: regiaoExame.nomeAgrupadora,
        value: regiaoExame.nroIntAgrupadora
      }
    });
  }

  private loadFiltrosOnBuffer() {
    if (!this.filtrosOnBuffer) {
      return;
    }

    this.formFields = {
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.nome) && {
        nome: this.filtrosOnBuffer.nome
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.situacao) && {
        situacao: {
          label: this.situacaoOptions.find((option) => option.value === this.filtrosOnBuffer.situacao)
            ?.label,
          value: this.filtrosOnBuffer.situacao
        }
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.regiaoExames) && {
        regiaoExames: {
          label: this.regiaoExamesOptions.find((option) => option.value === this.filtrosOnBuffer.regiaoExames)
            ?.label,
          value: this.filtrosOnBuffer.regiaoExames
        }
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.qtdExaminador) && {
        qtdExaminador: this.filtrosOnBuffer.qtdExaminador
      }),
      ...(!['', null, undefined].includes(this.filtrosOnBuffer.distribuicao) && {
        distribuicao: {
          label: this.distribuicaoOptions.find((option) => option.value === this.filtrosOnBuffer.distribuicao)
            ?.label,
          value: this.filtrosOnBuffer.distribuicao
        }
      })
    }
  }

  public handleChange(): void {
    let existemCamposInformados: boolean = false;

    Object.keys(this.formFields).forEach(key => {
      if (this.formFields[key]) {
        existemCamposInformados = true;
      }
    });

    this.localizarDisabled = !existemCamposInformados;

    this.clearErrors();

    this.clearList();
  }

  public handleClick(): void {
    this.clearErrors();

    this.filtros.emit(this.toPayload());
  }

  private toPayload(): any {
    const payload: any = {
      nome: null,
      situacao: null,
      regiaoExames: null,
      qtdExaminador: null,
      distribuicao: null
    }

    Object.assign(payload, {
      nome: this.formFields.nome,
      situacao: this.formFields.situacao?.value
        ? this.formFields.situacao?.value
        : null,
      regiaoExames: this.formFields.regiaoExames?.value
        ? this.formFields.regiaoExames?.value
        : null,
      qtdExaminador: this.formFields.qtdExaminador,
      distribuicao: this.formFields.distribuicao?.value
        ? this.formFields.distribuicao?.value
        : null
    });

    return payload;
  }

  private clearErrors(): void {
    this.errors = [];
    this.clearErrorsEvent.emit();
  }

  private clearList(): void {
    this.clearListEvent.emit();
  }
}*/
