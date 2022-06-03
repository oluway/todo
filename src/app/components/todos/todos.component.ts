import { Component, OnInit } from '@angular/core';
import * as uuid from "uuid";
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/model/Todo';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo-service.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoList: Todo[];
  todoForm = this.fb.group({
    todo: ["", Validators.required],
  })
  constructor(private fb: FormBuilder, private _todoService: TodoService) {

  }

  ngOnInit(): void {
    this.getAllTodos()
  }
  getAllTodos(){
    this.todoList = this._todoService.getAllTask();
  }
  addTodo(){
      const task = { id: uuid.v4(), isCompleted: false, ...this.todoForm.value}
      this._todoService.addTask(task);
      this.getAllTodos();
      this.todoForm.reset();
  }
  deleteTodo(id: string){
     this._todoService.deleteTask(id);
     this.getAllTodos();
  }
  clearCompleted(){
    this.todoList = this.todoList.filter(todos => todos.isCompleted !== true)
    this._todoService.clearCompletedTask(this.todoList);
    this.getAllTodos();
  }
  todoIsCompleted(id: string){
     this._todoService.updateTask(id);
     this.getAllTodos();
  }

  //Emited filter data
  getFilteredValue(filteredValue: any){
    this.todoList = filteredValue;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
  }

}
