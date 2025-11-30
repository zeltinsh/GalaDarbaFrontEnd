import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ManiPasakumiinterface } from '../models/manipasakumiinterface';
import { ManiPasakumiService } from '../services/mani-pasakumi';

@Component({
  selector: 'app-mani-pasakumi',
  standalone: true,
  imports: [],
  templateUrl: './mani-pasakumi.html',
  styleUrl: './mani-pasakumi.css',
})
export class ManiPasakumi implements OnInit {

  private maniPasakumiService = inject(ManiPasakumiService);
  private router = inject(Router);

  protected pasakumi = signal<ManiPasakumiinterface[]>([]);

  ngOnInit(): void {
    this.maniPasakumiService.iegutVisusPasakumus().subscribe({ 
      next: (response: ManiPasakumiinterface[]) => {
        this.pasakumi.set(response);
      },
      error: (err: any) => {
        console.error('Error fetching events:', err);
        this.pasakumi.set([]);
      }
    });
  }

  navigateToMain() {
    this.router.navigate(['/main']);
  }
}