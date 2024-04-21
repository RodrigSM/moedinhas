import { Component } from '@angular/core';
import { Moeda } from '../_models/moeda';
import { SearchMoedas } from '../_models/search-documents';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from './tab1.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public dataMoedas: any;
  public filterTerm: string;
  public moedas: Moeda[];
  Param: SearchMoedas = new SearchMoedas();
  constructor(private router: Router, private moedasService: ApiService) {}

  ngOnInit(): void {
    this.moedasService.getMoedasList();
    this.moedasService.moedas$.subscribe((moedas) => {
      this.moedas = moedas;
    });
  }

  leJSON() {
    fetch('./assets/data/moedas.json')
      .then((res) => res.json())
      .then((json) => {
        this.dataMoedas = json;
      });
  }
  public verDetalherMoeda(moeda: any) {
    let infoMoeda: NavigationExtras;
    infoMoeda = {
      state: {
        dadosMoeda: moeda,
      },
    };
    this.router.navigate(['moedaexpandida'], infoMoeda);
  }
}
