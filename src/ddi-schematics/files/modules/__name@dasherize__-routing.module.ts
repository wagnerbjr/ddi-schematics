/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lista<%= classify(name) %>Component } from './pages/lista-<%= dasherize(name) %>/lista-<%= dasherize(name) %>.component';

const routes: Routes = [
  {
    path: 'lista',
    component: Lista<%= classify(name) %>Component
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class <%= classify(name) %>RoutingModule {}
*/