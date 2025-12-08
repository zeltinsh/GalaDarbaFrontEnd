import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ManiPasakumiinterface } from "../models/manipasakumiinterface";

@Injectable({
  providedIn: 'root' //service is available application-wide. pieejams visās komponentēs
})
export class ManiPasakumiService {
    private readonly URL: string = 'http://localhost:8090/api/v1';
    private http: HttpClient = inject(HttpClient);

    iegutVisusPasakumus(): Observable<any> {
        return this.http.get<ManiPasakumiinterface[]>(`${this.URL}/manipasakumi`);
    }

    pievienotPasakumu(pasakums: ManiPasakumiinterface): Observable <any> {
        return this.http.post<ManiPasakumiinterface>(`${this.URL}/manipasakumi`, pasakums);
    }
    
    dzestPasakumu(id: number): Observable<any> {
        return this.http.delete<void>(`${this.URL}/manipasakumi/${id}`);
    }

    pieteiktiesPasakumam(pasakums: ManiPasakumiinterface): Observable<any> {
        return this.http.put<ManiPasakumiinterface>(`${this.URL}/manipasakumi/${pasakums.id}`, pasakums);
    }

    atteiktiesNoPasakuma(pasakumaId: number, userId: number): Observable<any> {
        return this.http.delete<ManiPasakumiinterface>(`${this.URL}/manipasakumi/${pasakumaId}/dalibnieki/${userId}`);
}
}