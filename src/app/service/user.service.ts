import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public loadData(page: number = 1, itemsPerPage: number = 5): Observable<IUsersResponse> {
    return this.http.get<IUser[]>('./assets/data/assets.json')
    .pipe(
      delay(1000), // to mimic waiting for an actual backend response
      map((items) => ({
        metadata: {
          itemsPerPage: itemsPerPage,
          page: page,
          totalItems: items.length
        },
        data: items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      }))
    );
  }
}

export interface IUser {
  id: number,
  name: string,
  email: string
}

export interface IPaginationMetadata {
  itemsPerPage: number,
  page: number,
  totalItems: number
}

export interface IUsersResponse {
  metadata: IPaginationMetadata,
  data: IUser[]
}
