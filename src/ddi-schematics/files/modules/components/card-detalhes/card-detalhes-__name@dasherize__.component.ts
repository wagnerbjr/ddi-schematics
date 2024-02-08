/*import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.dto';
import { PrvDateUtil } from '@core/utils/prv-date.util';
import { PermissaoService } from '@ddi-ng/permissao';

@Component({
  selector: 'app-card-detalhes-<%= dasherize(name) %>',
  templateUrl: './card-detalhes-<%= dasherize(name) %>.component.html',
  styleUrls: ['./card-detalhes-<%= dasherize(name) %>.component.scss']
})
export class CardDetalhes<%= classify(name) %>Component implements OnInit {

  @Input() <%= dasherize(name) %>: <%= classify(name) %> = {} as <%= classify(name) %>;
  @Output() alterar<%= classify(name) %>Event: EventEmitter<{ payload: <%= classify(name) %>, callback: Function }> = new EventEmitter();

  public nome<%= classify(name) %>: string = null;
  public isEdicao: boolean = false;
  //---------------------------  >>> Atributo para exibição de opções fixas (não dinâmicas) <<<  ----------------------------
  //public atributo1<%= classify(name) %>: {label:string, value:string} = null;
  //public atributo1<%= classify(name) %>Options: {label:string, value:string}[] = [{label:'Sim', value:'S'}, {label:'Não', value:'N'}];
  //public isDistribuicaoNao: boolean = false;

  constructor(
    private permissaoService: PermissaoService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.nome<%= classify(name) %> = this.<%= dasherize(name) %>.nome<%= classify(name) %>;
  }

  public handleEditarClick(): void {
    this.toggleIsEdicao();
    //this.isDistribuicaoNao = this.participaDistribuicao?.value === 'N';
  }

  public handleCancelarClick(): void {
    this.toggleIsEdicao();
    this.isDistribuicaoNao = false;
    this.nome<%= classify(name) %> = this.<%= dasherize(name) %>.nome<%= classify(name) %>;
    //this.atributo1<%= classify(name) %> = this.atributo1<%= classify(name) %>Options.find(opcao => opcao.value == this.<%= dasherize(name) %>.indAtributo1);
  }

  public handleSalvarClick(): void {
    this.alterar<%= classify(name) %>Event.emit({
      payload: {
        nroInt<%= classify(name) %>: this.<%= dasherize(name) %>.nroInt<%= classify(name) %>,
        cod<%= classify(name) %>: this.<%= dasherize(name) %>.cod<%= classify(name) %>,
        indAtivo: this.<%= dasherize(name) %>.indAtivo,
        nome<%= classify(name) %>: this.nome<%= classify(name) %>.trim(),
        //atributo1<%= classify(name) %>: this.atributo1<%= classify(name) %>.value,
        //agrupadoraDTO: this.regiaoExame
      } as <%= classify(name) %>,
      callback: this.toggleIsEdicao.bind(this)
    });
  }

  public handleChange(): void {
    //this.isDistribuicaoNao = false;
    //if (['0', 0].includes(this.qtdMinExaminador)) this.qtdMinExaminador = null;

    //if (this.atributo1<%= classify(name) %>?.value === 'N') {
    //  this.isDistribuicaoNao = true;
    //  this.qtdMinExaminador = 0;
    //}
  }

  private toggleIsEdicao(): void {
    this.isEdicao = !this.isEdicao;
  }

  private validateFields(): boolean {
    let retorno: boolean = true;

    //--------------------------------- >>> Validar condições de retornno <<< --------------------------
    //if (![null, undefined].includes(this.participaDistribuicao) && !['', null, undefined].includes(this.qtdMinExaminador?.toString())) {

    //  if (this.participaDistribuicao.value === 'N' && ![Number.NaN, 0].includes(parseInt(this.qtdMinExaminador.toString()))
    //      || this.participaDistribuicao.value === 'S' && [Number.NaN, 0].includes(parseInt(this.qtdMinExaminador.toString()))) {
    //    retorno = false;
    //  }
    //}

    return retorno;
  }

  public validateRequiredFields(): boolean {
    let retorno: boolean = true;
    const requiredFields: string[] = [
      'nome<%= classify(name) %>'
    ];

    requiredFields.forEach((element) => {
      if (['', null, undefined].includes(this[element])) {
        retorno = false;
      }
    });

    return retorno;
  }

  get isSalvarEnabled(): boolean {
    return (
      this.validateFields()
      && this.validateRequiredFields()
    );
  }

  get permissaoEditar(): boolean {
    return this.permissaoService.validarPermissao("ROTA", "ALTERA", "PRV");
  }

  get situacao(): string {
    return this.<%= dasherize(name) %>?.indAtivo == 'S' ? 'Ativo' : 'Inativo';
  }

  get nomeAgrupadora(): string {
    return this.<%= dasherize(name) %>?.agrupadoraDTO?.nomeAgrupadora;
  }

  get dataInclusao(): string {
    return !!this.<%= dasherize(name) %>.ctrSamdInc
      ? PrvDateUtil.toDate(this.<%= dasherize(name) %>.ctrSamdInc)?.toLocaleDateString()
      : 'Não Informado';
  }

  get dataAtualizacao(): string {
    return !!this.<%= dasherize(name) %>.ctrSamdAtu
      ? PrvDateUtil.toDate(this.<%= dasherize(name) %>.ctrSamdAtu)?.toLocaleDateString()
      : 'Não Informado';
  }

  get horaInclusao(): string {
    return !!this.<%= dasherize(name) %>.ctrHmsInc
      ? PrvDateUtil.toHour(this.<%= dasherize(name) %>.ctrHmsInc, 'hms')
      : 'Não Informado';
  }

  get horaAtualizacao(): string {
    return !!this.<%= dasherize(name) %>.ctrHmsAtu
      ? PrvDateUtil.toHour(this.<%= dasherize(name) %>.ctrHmsAtu, 'hms')
      : 'Não Informado';
  }

  get is<%= classify(name) %>Ativa(): boolean {
    return this.situacao == "Ativo";
  }


}
*/