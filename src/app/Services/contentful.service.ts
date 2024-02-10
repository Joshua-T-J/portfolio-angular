import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';

const CONFIG = {
  space: '84j8ulenxt5c',
  accessToken: '6qX10m3zEfJO0RF9UngtcJ-tr4ICksI8O0h2LPpuD-Y',
  contentTypeIds: {
    project: 'projects',
    resume: 'resumeDetails',
    projectTypes: 'projectTypes',
  },
};

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
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
              content_type: CONFIG.contentTypeIds.project,
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
              content_type: CONFIG.contentTypeIds.resume,
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
              content_type: CONFIG.contentTypeIds.projectTypes,
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
