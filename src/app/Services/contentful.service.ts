import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private cdaClient = createClient({
    space: environment.space,
    accessToken: environment.accessToken,
  });

  constructor() {}

  // getProjects(query?: object): Observable<Entry<any>[]> {
  //   return from(this.cdaClient.getEntries().then((res) => res.items));
  // }

  getProjects(query?: object): Observable<Entry<any>[]> {
    return from(
      this.cdaClient
        .getEntries(
          Object.assign(
            {
              content_type: environment.contentTypeIds.project,
            },
            query
          )
        )
        .then((res) => res.items)
    );
  }

  getProjectDetails(contentType: string): Observable<Entry<any>[]> {
    return from(
      this.cdaClient
        .getEntries(
          Object.assign({
            content_type: contentType,
          })
        )
        .then((res) => res.items)
    );
  }

  getResume(query?: object): Observable<Entry<any>[]> {
    return from(
      this.cdaClient
        .getEntries(
          Object.assign(
            {
              content_type: environment.contentTypeIds.resume,
            },
            query
          )
        )
        .then((res) => res.items)
    );
  }

  getProjectTypes(query?: object): Observable<Entry<any>[]> {
    return from(
      this.cdaClient
        .getEntries(
          Object.assign(
            {
              content_type: environment.contentTypeIds.projectTypes,
            },
            query
          )
        )
        .then((res) => res.items)
    );
  }

  getSingleProject(id: any): Observable<Entry<any>> {
    return from(this.cdaClient.getEntry(id));
  }
}
