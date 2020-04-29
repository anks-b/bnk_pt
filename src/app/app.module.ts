import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionDashboardComponent } from './transactions/transaction-dashboard/transaction-dashboard.component';
import { TransactionLogComponent } from './transactions/transaction-log/transaction-log.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';
import { MaterialModule } from './shared/material.module'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TransactionDashboardComponent,
    TransactionLogComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
