import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service.service';
import { Todo } from '../../model/Todo';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filterValue: EventEmitter<any> = new EventEmitter();

  filterData = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
]
  allTask: Todo[];
  todoList: Todo[];

  constructor(private _todoService: TodoService) {
   }

  ngOnInit(): void {
  }


  //reuseable filter selected value emitted
  seletedValue(selected: any){
    this.todoList = this._todoService.getAllTask();
    switch(selected.target.value){
      case 'all':
           this.filterValue.emit(this.todoList);
         break;
      case 'active':
           let activeTodos = this.todoList.filter(todos => todos.isCompleted === false)
           if(activeTodos.length > 0){
            this.filterValue.emit(activeTodos);
           }
         break;
      case 'completed':
           let completedTodos = this.todoList.filter(todos => todos.isCompleted === true)
                this.filterValue.emit(completedTodos || []);
         break;
      default:
        alert("No such filter exists!");
    }
  }

}
