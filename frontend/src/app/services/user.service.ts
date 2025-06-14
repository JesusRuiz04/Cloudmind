import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private emailSubject = new BehaviorSubject<string>(localStorage.getItem('email') || '');
  email$ = this.emailSubject.asObservable();

  setEmail(email: string) {
    localStorage.setItem('email', email);
    this.emailSubject.next(email);
  }

  clearEmail() {
    localStorage.removeItem('email');
    this.emailSubject.next('');
  }
}