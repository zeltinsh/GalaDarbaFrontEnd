import { Component, inject, OnInit, signal } from '@angular/core';
import { ManiPasakumiService } from '../services/mani-pasakumi';
import { Router } from '@angular/router';
import { ManiPasakumiinterface, PasakumuSaraksts } from '../models/manipasakumiinterface';
import { applyEach, Field, form, required } from '@angular/forms/signals';
import { Utilities } from '../utilities/utilities';
import { FormGroup } from '@angular/forms';
import { Header } from "../header/header";

@Component({
  selector: 'app-main',
  imports: [Field],
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class Main implements OnInit {
  
  private maniPasakumiService = inject(ManiPasakumiService);
  private router = inject(Router);
  private utilities = inject(Utilities);
  
  visuPasakumaSignals = signal<PasakumuSaraksts>({
        pasakumaArrays: [],
  });

  ngOnInit() {
    this.iegutVisusPasakumus();
  }

  protected pasakumaSignals = signal<ManiPasakumiinterface>({
    pasakumaNosaukums: '',
    pasakumaApraksts: '',
    pasakumaDatums: '',
    pasakumaLaiks: '',
    pasakumaVieta: '',
    dalibniekuSkaits: 0,
  });

  
 pasakumaForma = form(this.pasakumaSignals, (path) => {
    required(path.pasakumaNosaukums, { message: 'Pasākuma nosaukums ir obligāts' });
    required(path.pasakumaApraksts, { message: 'Pasākuma apraksts ir obligāts' });
    required(path.pasakumaDatums, { message: 'Pasākuma datums ir obligāts' });
    required(path.pasakumaLaiks, { message: 'Pasākuma laiks ir obligāts' });
    required(path.pasakumaVieta, { message: 'Pasākuma vieta ir obligāta' });
    required(path.dalibniekuSkaits, { message: 'Dalībnieku skaits ir obligāts' });
  });
  
  iegutVisusPasakumus() {
    this.maniPasakumiService.iegutVisusPasakumus().subscribe({ 
      next: (response) => {
        console.log('Iegūti visi pasākumi:', response);
        this.visuPasakumaSignals.update(() => ({
          pasakumaArrays: response
        }));
      },
      error: (err: any) => console.log('Kļūda iegūstot pasākumus:', err)
    });
  }

  pievienotPasakumu() {
    console.log('Pievienot pasākumu pogu nospiesta', this.pasakumaSignals());
    console.log('Forma vērtība:', this.pasakumaForma().value());
    
    this.maniPasakumiService.pievienotPasakumu(this.pasakumaForma().value()).subscribe({
      next: (response: ManiPasakumiinterface) => {
        console.log('Pasākums veiksmīgi pievienots:', response);
        this.visuPasakumaSignals.update((esosais: PasakumuSaraksts) => ({
          pasakumaArrays: [...esosais.pasakumaArrays, response],
        }));
      },
      error: (err: any) => {
        console.log('Kļūda pievienojot pasākumu:', err);
      },
    });
  }
}