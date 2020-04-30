import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ITransactionLog } from 'src/app/Models/ITransactionLog';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup;
  amount = 10000;
  constructor(private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.transactionForm = new FormGroup({ 
      fromAccount:  new FormControl('',),
      toAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    });
    this.transactionForm.setValue({fromAccount:'Checking ('+ this.amount +')' , toAccount:'', amount:''})
  }

  makeRandomColor(){
    var c = '';
    while (c.length < 7) {
      c += (Math.random()).toString(16).substr(-6).substr(-1)
    }
    return '#'+c;
  }
  makeTransfer(){
   
    if(this.transactionForm.invalid){
      return;
    }
    const model = this.transactionForm.value;
    this.transactionService.performTransaction(this.transactionForm.value).subscribe(d => {
      debugger;
      const mt = new Date().getMinutes(); 
      let c = {} as ITransactionLog;
      c.amount = model.amount;
      c.merchant = model.toAccount;
      c.transactionDate = new Date().getTime();
      c.transactionType =  mt%3 == 1 ? 'Card Payment' : mt%3  == 2 ? 'Online Transfer' :  'Transaction';
      c.categoryCode = this.makeRandomColor();
      this.transactionService.updateTransaction(c);
      this.transactionForm.reset();
      this.amount = this.amount - model.amount;
      this.transactionForm.get('fromAccount').setValue('Checking ('+ this.amount +')')
      this.transactionForm.markAsPristine();
      this.transactionForm.markAsUntouched();
    })
  }

  
}
