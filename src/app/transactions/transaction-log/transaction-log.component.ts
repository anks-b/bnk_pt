import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service'
@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit {
  pastTransaction: any[] = [];

  constructor( private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.getRecentTransactions();
  }

  getRecentTransactions(){
    this.transactionService.getTransactions().subscribe(c => {
      debugger;
    })
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
