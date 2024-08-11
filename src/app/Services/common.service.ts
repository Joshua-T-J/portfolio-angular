import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // _proxyUrl = environment.PROXY_URL;

  loading: boolean = false;
  formsApiUrl: string = environment.GoogleSheetsAPI;

  constructor(private http: HttpClient) {}

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  submitForm(formData: FormData): Observable<any> {
    return this.http.post(this.formsApiUrl, formData);
  }
  // getProxy() {
  //   return this.http.get(
  //     `${environment.PROXY_URL}api/contentful/project-types`
  //   );
  // }
}
