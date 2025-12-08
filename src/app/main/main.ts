import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Field } from '@angular/forms/signals';
import { SecondUtilities } from '../utilities/utilities';
import { ManiPasakumiinterface } from '../models/manipasakumiinterface';

@Component({
  selector: 'app-main',
  imports: [Field],
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class Main implements OnInit {
  
  private router = inject(Router);
  protected secondUtilities = inject(SecondUtilities);
  
   get visuPasakumaSignals() {
    return this.secondUtilities.visuPasakumaSignals;
  }
  
  get pasakumaForma() {
    return this.secondUtilities.pasakumaForma;
  }

  ngOnInit() {
    this.secondUtilities.iegutVisusPasakumus();
  }

  iegutVisusPasakumus() {
    this.secondUtilities.iegutVisusPasakumus();
  }

  get todayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  pievienotPasakumu() {
    const selectedDate = this.secondUtilities.pasakumaForma().value().pasakumaDatums;
    const today = this.todayDate;
    
    if (selectedDate < today) {
      alert('Nevar izveidot pasākumu pagātnē! Lūdzu, izvēlieties nākotnes datumu.');
      return;
    }
    
    this.secondUtilities.pievienotPasakumu();
  }

  pieteiktiesPasakumam(pasakums: ManiPasakumiinterface) {
    if (!pasakums.id) return;
        const pieteikusiesDalibnieki = pasakums.pieteikusiesDalibnieki || 0;
        if (pieteikusiesDalibnieki >= pasakums.dalibniekuSkaits) {
      alert('Pasākumam ir sasniegts maksimālais dalībnieku skaits!');
      return;
    }
        pasakums.pieteikusiesDalibnieki = pieteikusiesDalibnieki + 1;
        console.log('Pieteikts pasākumam:', pasakums.pasakumaNosaukums);
  }
  
  atteiktiesNoPasakuma(pasakums: ManiPasakumiinterface) {
    if (!pasakums.id) return;
        const pieteikusiesDalibnieki = pasakums.pieteikusiesDalibnieki || 0;
        if (pieteikusiesDalibnieki <= 0) {
      alert('Jūs neesat pieteicies šim pasākumam!');
      return;
    }
    pasakums.pieteikusiesDalibnieki = pieteikusiesDalibnieki - 1;
    console.log('Atteikts no pasākuma:', pasakums.pasakumaNosaukums);
  }

  navigateToManiPasakumi() {
    this.router.navigate(['/mani-pasakumi']);
  }
}