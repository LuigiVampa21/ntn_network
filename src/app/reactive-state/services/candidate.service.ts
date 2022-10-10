import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, delay, map, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private _isLoading$ = new BehaviorSubject<boolean>(false);  
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  private lastCandidatesLoad = 0;
  
  constructor(private http: HttpClient) { }
  

  get loading$(): Observable<boolean>{
    return this._isLoading$.asObservable();
  }
  
  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  setLoadingStatus(loading: boolean){
    this._isLoading$.next(loading)
  }

  getCandidatesFromServer(){
    if(Date.now() - this.lastCandidatesLoad <= 300000) return;
    this.setLoadingStatus(true)
    this.http.get<Candidate[]>(`${environment.apiURL}/candidates`).pipe(
      delay(1000),
      tap(candidates => {
        this.lastCandidatesLoad = Date.now();
        this._candidates$.next(candidates);
        this.setLoadingStatus(false)
      })
    ).subscribe()
  }

  getCandidateByID(id:number): Observable<Candidate>{
    if(!this.lastCandidatesLoad) {
      this.getCandidatesFromServer()
    }
    return this.candidates$.pipe(
      map(candidates => candidates.filter(candidate => candidate.id === id)[0])
    );
  }

  refuseCandidate(id:number):void{
    this.setLoadingStatus(true);
    this.http.delete(`${environment.apiURL}/candidates/${id}`).pipe(
      delay(1000),
      switchMap( () => this.candidates$),
      take(1),
      map(candidates => candidates.filter(candidate => candidate.id !== id)),
      tap(candidates => {
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  hireCandidate(id:number):void{
    this.candidates$.pipe(
      take(1),
      map(candidates => candidates
        .map(candidate => candidate.id === id ? 
          {...candidate, company: 'SnapfaceLtd'} : 
          candidate
          )),
          tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
          switchMap(updatedCandidates => this.http.patch(`${environment.apiURL}/candidates/${id}`,
           updatedCandidates.find(candidate => candidate.id === id )))
    ).subscribe()
  }

}
