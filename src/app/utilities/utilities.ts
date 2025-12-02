import { Injectable } from '@angular/core';
import { ManiPasakumiinterface } from '../models/manipasakumiinterface';

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
