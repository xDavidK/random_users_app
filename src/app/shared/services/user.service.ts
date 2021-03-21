import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user.models';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentSeed;
  private results;
  private reloadSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  getResults() {
    return this.results;
  }

  getSeed() {
    return this.currentSeed;
  }

  setResults(results: number) {
    this.results = results;
  }

  setSeed(seed: string) {
    this.currentSeed = seed;
  }


  getReloadObs() {
    return this.reloadSubject.asObservable();
  }

  reloadData() {
    this.reloadSubject.next(true);
  }

  getRandomUsers(results: number = this.results, seed: string = this.currentSeed) {
    results = results <= 0 ? 1 : results;
    return this.http.get<User[]>(`${environment.apiUrl}/?exc=login,registered&noinfo&seed=${seed}&results=${results}`)
      .pipe(
        map(data => {
          return data["results"];
        }),
        catchError(() => of([]))
      );
  }

}
