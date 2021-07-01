import {Injectable} from '@angular/core';

export interface Todo {
  firstName: string
  lastName: string
  dateOfBirth: string
  framework: string
  frameworkVersion: string
  email: string
  hobby: Array<any>
  id: number
}

@Injectable({providedIn: 'root'})
export class TodosService {
  public todos: Todo[] = []

  constructor() {}

  pushUserData(todo: Todo) {
    console.log('todo = ', todo)
    alert(JSON.stringify(todo) + '\n(копия в консоле)')
  }
}
