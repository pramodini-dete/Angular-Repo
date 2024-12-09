import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Post {
  userId:number;
  id:number;
  title:string;
  body:string;
}

@Injectable({
  providedIn: 'root',
})

export class PostService {

  private apiURL: string = 'https://jsonplaceholder.typicode.com/';

  // Define request headers
  public requestHeadersJSON = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Define the return type as Observable<Post[]>

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + 'posts').pipe(
      catchError(this.handleError) // Call a custom error handler
    );
  }

  //Create
  create(post: Post): Observable<any> {
    return this.httpClient
      .post(
        this.apiURL + 'posts/',
        JSON.stringify(post),
        this.requestHeadersJSON
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
  //find data
  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + 'posts/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  //update
  update(id: number, post: Post): Observable<any> {
    return this.httpClient
      .put(
        this.apiURL + 'posts/' + id,
        JSON.stringify(post),
        this.requestHeadersJSON
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  //delete
  delete(id: number) {
    return this.httpClient.delete(this.apiURL + 'posts/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }

    // Optionally log the error to the console
    console.error(errorMessage);

    // Throw an observable with a user-facing error message
    return throwError(errorMessage);
  }
}
