import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service'
import { ITransactionLog } from '../../Models/ITransactionLog'

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit {
  pastTransactions: ITransactionLog[] = [];
  displayedColumns: string[] = [    
    'TransactionDate',    
    'MerchantLogo',
    'Merchant',
    'Amount',
  ];

  
  

  constructor( private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.getRecentTransactions();
  }

  getRecentTransactions(){
    this.transactionService.getTransactions().subscribe(res => {
      if( res.data && res.data.length){
      this.pastTransactions = res.data;
      }
    })
  }

}
