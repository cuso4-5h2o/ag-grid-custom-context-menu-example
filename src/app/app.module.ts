import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ResultListContextComponent } from './result-list-context/result-list-context.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultListComponent,
    ResultListContextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
