/*
import { Component } from '@angular/core';
import { <%= classify(name) %>Actions } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.actions';
import { <%= classify(name) %>Store } from '@core/<%= dasherize(name) %>/store/<%= dasherize(name) %>.store';
import { <%= classify(name) %>InclusaoDTO } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>';
import { <%= classify(name) %>State } from '@core/<%= dasherize(name) %>/types/<%= dasherize(name) %>.state';
import { Toastr } from '@core/types/toastr.type';
import { ErrorHandlerUtil } from '@core/utils/error-handler.util';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoMensagemEnum } from 'app/shared/enums/tipe-mensagem.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-incluir-<%= dasherize(name) %>',
  templateUrl: './modal-incluir-<%= dasherize(name) %>.component.html',
  styleUrls: ['./modal-incluir-<%= dasherize(name) %>.component.scss']
})
export class ModalIncluir<%= classify(name) %>Component {
  public toastrs: Toastr[] = [];
  public seletorData = null;
  public isloadingModal = false;
  public tituloModal: string;
  public <%= camelize(name) %>InclusaoDTO: <%= classify(name) %>InclusaoDTO;

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

  public turmaForm: {
    descricao: string,
    turma: string,
    ativo: number,
    seletorData: string
  } = {
    descricao: '',
    turma: '',
    ativo: 1,
    seletorData: ''
  };

  public <%= camelize(name) %>Subscription: Subscription = null;

  constructor(
    public activeModal: NgbActiveModal,
    private <%= camelize(name) %>Actions: <%= classify(name) %>Actions,
    private <%= camelize(name) %>Store: <%= classify(name) %>Store,
  ) { }


  handleSalvarClick() {
    this.isloadingModal = true;
    this.incluir();
  }

  private incluir(): Promise<void> {

    // montar dto de envio
    // lembrar de incluir data e sua conversão caso necessario

    this.<%= camelize(name) %>InclusaoDTO = {
      descricao: this.turmaForm.get('descricao').value,
      tpTurma: this.turmaForm.get('turma').value,
      situacao: this.turmaForm.get('ativo').value,
    }

    return new Promise((resolve, reject) => {
      this.<%= camelize(name) %>Subscription?.unsubscribe();
      this.<%= camelize(name) %>Actions.inclui<%= classify(name) %>(this.<%= camelize(name) %>InclusaoDTO);

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
            // permite capturar o resutltado do modal fechado.
            this.activeModal.close(this.<%= camelize(name) %>InclusaoDTO);
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
