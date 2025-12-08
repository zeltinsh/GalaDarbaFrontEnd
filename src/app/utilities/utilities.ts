import { Injectable, signal, inject } from '@angular/core';
import { ManiPasakumiinterface, PasakumuSaraksts } from '../models/manipasakumiinterface';
import { form, required } from '@angular/forms/signals';
import { ManiPasakumiService } from '../services/mani-pasakumi';

@Injectable({
  providedIn: 'root',
})
export class Utilities {
   public createTuksPasakums(): ManiPasakumiinterface {
    return {
      pasakumaNosaukums: '',
      pasakumaApraksts: '',
      pasakumaDatums: '',
      pasakumaLaiks: '',
      pasakumaVieta: '',
      dalibniekuSkaits: 0
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class SecondUtilities {
  private maniPasakumiService = inject(ManiPasakumiService);
  private utilities = inject(Utilities);
  
  visuPasakumaSignals = signal<PasakumuSaraksts>({
    pasakumaArrays: [],
  });

  protected pasakumaSignals = signal<ManiPasakumiinterface>(this.utilities.createTuksPasakums());

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
             
        this.pasakumaSignals.set(this.utilities.createTuksPasakums());
        this.iegutVisusPasakumus();
      },
      error: (err: any) => {
        console.log('Kļūda pievienojot pasākumu:', err);
      },
    });
  }
}
