import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SearchMoedas } from '../_models/search-documents';
import { BehaviorSubject, Observable } from 'rxjs';
import { Moeda } from '../_models/moeda';
import { HttpClient } from '@angular/common/http';
import { ResponseBody } from '../_models/response-body';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements Resolve<any> {
  Param: SearchMoedas = new SearchMoedas();
  private apiUrl = 'http://localhost:5000/api/account';
  onClientsChanged: BehaviorSubject<any>;
  moedas: Moeda[];
  public routeParams: any;
  private moedasSubject = new BehaviorSubject<Moeda[]>([]);
  moedas$ = this.moedasSubject.asObservable();
  public saveSearch = {
    Nome: '',
    Preco: '',
  };
  constructor(public http: HttpClient) {
    this.onClientsChanged = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
      Promise.all([this.getMoedasList()]).then(() => {
        resolve(null);
      }, reject);
    });
  }

  getMoedasList() {
    this.http
      .post<any>(`${this.apiUrl}/GetMoedasList`, this.saveSearch)
      .subscribe(
        (response: ResponseBody) => {
          if (response.Code == 1) {
            const moedas = response.Data as Moeda[];
            this.moedasSubject.next(moedas);
          } else {
          }
        },
        (error) => {}
      );
  }
}
