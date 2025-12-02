import { Component, inject, OnInit, signal } from '@angular/core';
import { ManiPasakumiService } from '../services/mani-pasakumi';
import { Router } from '@angular/router';
import { ManiPasakumiinterface, PasakumuSaraksts } from '../models/manipasakumiinterface';
import { applyEach, Field, form, required } from '@angular/forms/signals';
import { Utilities } from '../utilities/utilities';

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
  
  protected pasakumaSignals = signal<PasakumuSaraksts>({
    pasakumaArrays: [this.utilities.createTuksPasakums()]
  });
  pasākumaForma = form(this.pasakumaSignals, (formasPath) => {
    applyEach(formasPath.pasakumaArrays, (arajaElementaPath) => {
      required(arajaElementaPath.pasakumaNosaukums, { message: 'Nosaukums ir obligāts lauks' });
    });
  });

  ngOnInit(): void {
    // Load existing events if needed
  }

 

  pievienotPasakumu(): void {
    const pasakumi: ManiPasakumiinterface[] = this.pasakumaSignals().pasakumaArrays;
    if (pasakumi.length === 0) return;
    
    const pedejaisPasākums: ManiPasakumiinterface = pasakumi[pasakumi.length - 1];
   this.maniPasakumiService.pievienotPasakumu(pedejaisPasākums).subscribe({
      next: (response) => {
               if (response.id) {
          this.pasakumaSignals.update(data => ({
            pasakumaArrays: [
              ...data.pasakumaArrays.slice(0, -1), // Remove last event
              { ...pedejaisPasākums, id: response.id }, // Add last event with new ID
              this.utilities.createTuksPasakums() // Add new empty event
            ]
          }));
          
        }
      },
     error: (err: any) => {
      console.error('Kļūda pievienojot pasākumu:', err); 

      }
    });
  }
}
