import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  apiUrl = 'http://localhost:4243/courses';

  constructor(private _http: HttpClient) { }

  getCourse() {

    return this._http.get<Course[]>(this.apiUrl);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  /** POST: add a new Course to the server */
  addCourse(Course: any): Observable<Course> {
    return this._http.post<Course>(this.apiUrl, Course).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(course: Course): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this._http.put<Course>(`${this.apiUrl}/${course.id}`, course, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  /** DELETE: delete the Course from the server */
  deleteCourse(Course: Course | number): Observable<Course> {
    const id = typeof Course === 'number' ? Course : Course.id;
    const url = `${this.apiUrl}/${id}`;

    return this._http.delete<Course>(url).pipe(
      tap(_ => console.log(`deleted Course id=${id}`)),
      catchError(this.handleError)
    );
  }


}