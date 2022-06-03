import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setTodo(key: string, payload: any): void {
    localStorage.setItem(key, JSON.stringify(payload));
  }
  getTodos(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
