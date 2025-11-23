import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root' //service is available application-wide. pieejams visās komponentēs
})
export class UserService {

  private readonly URL: string = 'http://localhost:8090/api/v1';

  private http: HttpClient = inject(HttpClient);

  logIn(userData: Signal<any>): Observable<HttpResponse<number>> {
    return this.http.post<number>(this.URL + '/user', userData(), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }
}