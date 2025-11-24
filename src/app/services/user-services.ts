import { HttpClient, HttpHeaders,} from "@angular/common/http";
import { inject, Injectable,} from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root' //service is available application-wide. pieejams visās komponentēs
})
export class UserService {

  private readonly URL: string = 'http://localhost:8090/api/v1';

  private http: HttpClient = inject(HttpClient);

login (userData: any): Observable<any> {
 return this.http.post(this.URL + '/user', userData);
}
}