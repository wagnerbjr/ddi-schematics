/*//import { ModalConsulta<%= classify(name) %>Component } from './components/modal-consulta-regiao-exame/modal-consulta-<%= dasherize(name) %>.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lista<%= classify(name) %>Component } from './pages/lista-<%= dasherize(name) %>/lista-<%= dasherize(name) %>.component';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { PrvToastrModule } from '@ui/prv-toastr/prv-toastr.module';
import { DetranLayoutModule, DetranLoaderModule } from '@ddi-ng/layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FieldsModule } from 'app/shared/components/fields/fields.module';
import { CardLista<%= classify(name) %>Component } from './components/card-lista-<%= dasherize(name) %>/card-lista-<%= dasherize(name) %>.component';

@NgModule({
  declarations: [
    Lista<%= classify(name) %>Component,
    CardLista<%= classify(name) %>Component,
    ModalConsulta<%= classify(name) %>Component
  ],
  imports: [
    CommonModule,
    <%= classify(name) %>RoutingModule,
    PrvToastrModule,
    DetranLoaderModule,
    DetranLayoutModule,
    NgSelectModule,
    FormsModule,
    FieldsModule
  ]
})
export class <%= classify(name) %>Module { }
*/