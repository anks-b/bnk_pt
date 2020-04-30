import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { ITransactionLog } from '../Models/ITransactionLog';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private subject = new Subject<ITransactionLog>();
  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any>{
    return this.http.get("assets/transactions.json")
  }

  updateTransaction(transaction: ITransactionLog) {
    this.subject.next( transaction );
  }

  performTransaction(transaction: any){
    return of(transaction)
  }

  getLastTransaction(): Observable<ITransactionLog> {
    return this.subject.asObservable();
  }
}
