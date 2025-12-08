import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ManiPasakumiinterface, PasakumuSaraksts } from '../models/manipasakumiinterface';
import { ManiPasakumiService } from '../services/mani-pasakumi';
import { HttpResponse } from '@angular/common/http';
import { SecondUtilities, Utilities } from '../utilities/utilities';

@Component({
  selector: 'app-mani-pasakumi',
  standalone: true,
  imports: [],
  templateUrl: './mani-pasakumi.html',
  styleUrls: ['./mani-pasakumi.css'],
})
export class ManiPasakumi implements OnInit {

  private router = inject(Router);
  private maniPasakumiService = inject(ManiPasakumiService);
  secondUtilities = inject(SecondUtilities);
  
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

  dzestPasakumu(id: number) {
    if (confirm('Vai tiešām vēlaties dzēst šo pasākumu?')) {
      this.maniPasakumiService.dzestPasakumu(id).subscribe({
        next: () => {
          console.log('Pasākums veiksmīgi dzēsts:', id);
                  this.secondUtilities.visuPasakumaSignals.set({
            pasakumaArrays: this.secondUtilities.visuPasakumaSignals().pasakumaArrays.filter(
              pasakums => pasakums.id !== id
            )
          });
        },
        error: (err: any) => {
          console.log('Kļūda dzēšot pasākumu:', err);
        }
      });
    }
  }

  navigateToMain() {
    this.router.navigate(['/main']);
  }
}