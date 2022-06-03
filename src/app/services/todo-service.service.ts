import { Injectable } from '@angular/core';
import { Todo } from '../model/Todo';
import { StorageService } from './storage-service.service';

const todoKey = 'Todo';


@Injectable({
  providedIn: 'root'
})

export class TodoService {
  todoList: Array<Todo> = [];
  constructor(private storage: StorageService) {
     this.todoList = storage.getTodos(todoKey)
     || [];
  }

  getAllTask(): Todo[] {
    return this.getTodos();
  }

  addTask(todo: Todo): void {
    this.todoList.push(todo);
    this.saveTask();
  }

  deleteTask(id){
    this.todoList = this.todoList.filter(todos => todos.id !== id);
    this.saveTask();
  }
  updateTask(id){
    this.todoList.forEach((item,index)=>{
      if(item.id === id )
      this.todoList[index].isCompleted = true
   })
   this.saveTask();
  }
  clearCompletedTask(payload){
    this.todoList = payload;
    this.saveTask();
  }



  private saveTask(): void {
    this.storage.setTodo(todoKey, this.todoList);
  }
  private getTodos(){
    return this.storage.getTodos(todoKey)
  }
}
