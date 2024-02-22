/*
import { Component, OnInit} from '@angular/core';
import { <%= classify(name) %>Actions } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions';
import { <%= classify(name) %>Store } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.store';
import { <%= classify(name) %>DetalhesDTO } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>';
import { <%= classify(name) %>State } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.state';
import { Toastr } from '@core/types/toastr.type';
import { ErrorHandlerUtil } from '@core/utils/error-handler.util';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoMensagemEnum } from 'app/shared/enums/tipe-mensagem.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-alterar-<%= dasherize(name) %>',
  templateUrl: './modal-alterar-<%= dasherize(name) %>.component.html',
  styleUrls: ['./modal-alterar-<%= dasherize(name) %>.component.scss']
})
export class ModalAlterar<%= classify(name) %>Component implements OnInit {
  public id: number;
  public isEditar: boolean;
  public toastrs: Toastr[] = [];
  public seletorData = null;
  public isloadingModal = false;
  public tituloModal: string;
  public edicaoBlock = false;
  public <%= camelize(name) %>DetalhesDTO: <%= classify(name) %>DetalhesDTO;
  public turmaForm: {
    descricao: string,
    turma: string,
    ativo: number,
    seletorData: string,
    versao: string,
  } = {
    descricao: '',
    turma: '',
    ativo: 1,
    seletorData: ''
  };

  // ex - com o ngFor determinamos a label do select por seu valor numerico
  public ativoOptions: { label: string, value: number }[] = [
    { label: 'Sim', value: 1 },
    { label: 'Não', value: 0 }
  ];

  // ex - com o ngFor determinamos a label do select por seu valor de string
  public turmaOptions: { label: string, value: string }[] = [
    { label: 'Teórica', value: "T" },
    { label: 'Prática', value: "P" },
    { label: 'Ambas', value: "A" }
  ];

  <%= camelize(name) %>Subscription: Subscription = null;

  constructor(
    public activeModal: NgbActiveModal,
    private <%= camelize(name) %>Actions: <%= classify(name) %>Actions,
    private <%= camelize(name) %>Store: <%= classify(name) %>Store,
  ) { }

  ngOnInit(): void {
    if(this.id){
      this.consultar();
    }
  }

  // bloqueio de campos mediante ser consulta e validação do form para o botão
  handleSalvarClick() {
    this.isloadingModal = true;

    if (this.id && this.isEditar) {
      this.alterar();
    } else {
      this.activeModal.close();
    }
  }

  private consultar(): Promise<void> {
    this.isloadingModal = true;
    return new Promise((resolve, reject) => {
      this.<%= camelize(name) %>Subscription?.unsubscribe();
      this.<%= camelize(name) %>Actions.consulta<%= classify(name) %>(this.id);

      this.<%= camelize(name) %>Subscription = this.<%= camelize(name) %>Store
        .state$
        .subscribe((data: <%= classify(name) %>State) => {
          if(data.<%= camelize(name) %>.hasErrors) {
            const rawMessage: string = data.<%= camelize(name) %>.errorMessage;

            this.exibeToastr(
              ErrorHandlerUtil.getMessage(rawMessage),
              ErrorHandlerUtil.getStatus(rawMessage)
            );

            this.<%= camelize(name) %>Subscription?.unsubscribe();
            reject();
            return;
          }
          if(!data.<%= camelize(name) %>.isLoading) {
            // retorno da consulta e preenchendo no formulario
            this.provaPraticaDetalhesDTO = data.provaPratica.data;
            this.turmaForm.descricao = this.provaPraticaDetalhesDTO.descricao;
            this.turmaForm.turma = this.provaPraticaDetalhesDTO.tpTurma;
            this.turmaForm.ativo = this.provaPraticaDetalhesDTO.situacao;
            this.turmaForm.versao = this.provaPraticaDetalhesDTO.versao;
            // NÃO IMPLEMENTADO - retornar o valor do DTO para seletor de DATA com conversão necessária

            // exemplo de bloqueio de edição caso necessário
            // if(this.provaPraticaDetalhesDTO.permiteEdicao == 'N'){
            //  this.edicaoBlock = true;
            //  ... outras alterações.
            // }

            this.<%= camelize(name) %>Subscription?.unsubscribe();
            resolve();
            this.isloadingModal = false;
          }
        });
    });
  }

  private alterar(): Promise<void> {
    // montar campos do DTO que será enviado
    this.<%= camelize(name) %>DetalhesDTO = {
      codigo: this.id,
      descricao: this.turmaForm.descricao,
      tpTurma: this.turmaForm.turma,
      situacao: this.turmaForm.ativo,
      versao: this.turmaForm.ativo,
    }

    // NÃO IMPLEMENTADO - passar o valor para o DTO para o seletor de DATA com a conversão necessária

    return new Promise((resolve, reject) => {
      this.<%= camelize(name) %>Subscription?.unsubscribe();
      this.<%= camelize(name) %>Actions.altera<%= classify(name) %>(this.<%= camelize(name) %>DetalhesDTO);

      this.<%= camelize(name) %>Subscription = this.<%= camelize(name) %>Store
        .state$
        .subscribe((data: <%= classify(name) %>State) => {
          if(data.<%= camelize(name) %>.hasErrors) {
            const rawMessage: string = data.<%= camelize(name) %>.errorMessage;

            this.exibeToastr(
              ErrorHandlerUtil.getMessage(rawMessage),
              ErrorHandlerUtil.getStatus(rawMessage)
            );

            this.<%= camelize(name) %>Subscription?.unsubscribe();
            reject();
            return;
          }
          if(!data.<%= camelize(name) %>.isLoading) {
            this.<%= camelize(name) %>Subscription?.unsubscribe();
            resolve();
             // permite pegar o resultado do modal fechado
            this.activeModal.close(this.<%= camelize(name) %>DetalhesDTO);
          }
        });
    });
  }

  public clearToastrs(): void {
    this.toastrs = [];
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

  isFormValid(): boolean {
    // implementar lógica necessaria

    if(this.turmaForm.descricao && this.turmaForm.turma && this.turmaForm.ativo && this.turmaForm.seletorData){
      return true;
    } else {
      return false;
    }
  }

}
*/
