import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Polls } from './polls.models';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private baseUrl="http://localhost:8090/api/polls";
  constructor(private http: HttpClient){}

  createPoll(poll : Polls) : Observable<Polls>{
    return this.http.post<Polls>(this.baseUrl, poll);
  }

  getPolls() : Observable<Polls[]>{
    return this.http.get<Polls[]>(this.baseUrl);
  }

  vote(pollId : number, optionIndex: number): Observable<void>{
    const url=`${this.baseUrl}/vote`;
    return this.http.post<void>(url,{pollId, optionIndex});
  }

}
