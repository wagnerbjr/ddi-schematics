/*import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { <%= classify(name) %>Service } from "./service/<%= dasherize(name) %>.service";
import { <%= classify(name) %>Actions } from "./store/<%= dasherize(name) %>.actions";
import { <%= classify(name) %>Store } from "./store/<%= dasherize(name) %>.store";

@NgModule({
  imports: [CommonModule],
   providers: [
     <%= classify(name) %>Actions,
     <%= classify(name) %>Store,
     <%= classify(name) %>Service
   ]
 })

export class  <%= classify(name) %>StoreModule {
  constructor(
    protected <%= dasherize(name) %>Store: <%= classify(name) %>Store,
    protected <%= dasherize(name) %>Actions: <%= classify(name) %>Actions,
    protected <%= dasherize(name) %>Service: <%= classify(name) %>Service
  ) {}
}*/
