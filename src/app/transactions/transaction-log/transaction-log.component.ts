import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service'
import { ITransactionLog } from '../../Models/ITransactionLog'
import { Observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { MatSortable } from '@angular/material/sort';

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
  subscription: Observable<ITransactionLog>;
  dataSource:any

  
  

  constructor( private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.getRecentTransactions();
    this.subscription = this.transactionService.getLastTransaction();
    this.subscription.subscribe(c => {
      debugger;
      this.pastTransactions.unshift(c);
      this.pastTransactions = this.pastTransactions.concat([]);
      this.dataSource = new MatTableDataSource(this.pastTransactions);
    })
  }

  getRecentTransactions(){
    this.transactionService.getTransactions().subscribe(res => {
      if( res.data && res.data.length){
      this.pastTransactions = res.data;
      this.dataSource = new MatTableDataSource(this.pastTransactions);
      // this.datasource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applySort(value: string, start = 'asc'){
    // this.dataSource.sort.sort(<MatSortable>({ id: value, start: start }));
    this.dataSource.data.sort((a: any, b: any) => {
        if (a[value] < b[value]) {
            return -1;
        } else if (a[value] > b[value]) {
            return 1;
        } else {
            return 0;
        }
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }



}
