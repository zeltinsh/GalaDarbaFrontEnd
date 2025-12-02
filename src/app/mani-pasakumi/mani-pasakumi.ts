import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ManiPasakumiinterface, PasakumuSaraksts } from '../models/manipasakumiinterface';
import { ManiPasakumiService } from '../services/mani-pasakumi';
import { HttpResponse } from '@angular/common/http';
import { Utilities } from '../utilities/utilities';

@Component({
  selector: 'app-mani-pasakumi',
  standalone: true,
  imports: [],
  templateUrl: './mani-pasakumi.html',
  styleUrls: ['./mani-pasakumi.css'],
})
export class ManiPasakumi implements OnInit {

  private maniPasakumiService = inject(ManiPasakumiService);
  private router = inject(Router);
  private utilities = inject(Utilities);

  protected pasakumiSignals = signal<PasakumuSaraksts>({
    pasakumaArrays: []
  });

  ngOnInit(): void {
    this.maniPasakumiService.iegutVisusPasakumus().subscribe({ 
      next: (response: HttpResponse<ManiPasakumiinterface[]>) => {
        const ManiPasakumiinterface = response.body;
        if (ManiPasakumiinterface && ManiPasakumiinterface.length > 0) {
this.pasakumiSignals.update(() => ({
    pasakumaArrays: [...ManiPasakumiinterface, this.utilities.createTuksPasakums()]
          }));
        } else {
          this.pasakumiSignals.set({
            pasakumaArrays: [this.utilities.createTuksPasakums()]
          });
        }
      },
      error: (err: any) => {
        console.error('Kļūda iegūstot rezervētos pasākumus', err);
        this.pasakumiSignals.set({
          pasakumaArrays: [this.utilities.createTuksPasakums()]
        });
      }
    });
  }

  navigateToMain() {
    this.router.navigate(['/main']);
  }
}