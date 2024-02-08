/*//import { ModalConsulta<%= classify(name) %>Component } from './components/modal-consulta-regiao-exame/modal-consulta-<%= dasherize(name) %>.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lista<%= classify(name) %>Component } from './pages/lista-<%= dasherize(name) %>/lista-<%= dasherize(name) %>.component';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { PrvToastrModule } from '@ui/prv-toastr/prv-toastr.module';
import { DetranDateFormatModule, DetranLayoutModule, DetranLoaderModule } from '@ddi-ng/layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FieldsModule } from 'app/shared/components/fields/fields.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CardLista<%= classify(name) %>Component } from './components/card-lista/card-lista-<%= dasherize(name) %>.component';
import { CardFiltra<%= classify(name) %>Component } from './components/card-filtra/card-filtra-<%= dasherize(name) %>.component';
import { CardDetalhes<%= classify(name) %>Component } from './components/card-detalhes/card-detalhes-<%= dasherize(name) %>.component';
import { ModalAlterar<%= classify(name) %>Component } from './components/modal-alterar/modal-alterar-<%= dasherize(name) %>.component';

@NgModule({
  declarations: [
    Lista<%= classify(name) %>Component,
    CardLista<%= classify(name) %>Component,
    CardFiltra<%= classify(name) %>Component,
    CardDetalhes<%= classify(name) %>Component,
    //ModalConsulta<%= classify(name) %>Component,
    ModalAlterar<%= classify(name) %>Component
  ],
  imports: [
    CommonModule,
    <%= classify(name) %>RoutingModule,
    PrvToastrModule,
    DetranDateFormatModule,
    DetranLoaderModule,
    DetranLayoutModule,
    NgSelectModule,
    FormsModule,
    FieldsModule,
    DetranDateFormatModule,
    NgbDatepickerModule
  ]
})
export class <%= classify(name) %>Module { }
*/