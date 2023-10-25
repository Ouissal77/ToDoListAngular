import { Component } from '@angular/core';
import { ToDo } from 'src/app/class/ToDo';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoValue: string =' ';

  todoList: ToDo[]= [
    {
      content:"task1",
      value: false
    },
    {
      content:"task3",
      value: true
    },
    {
      content:"task2",
      value: false
    },
  
    {
      content:"task4",
      value: false
    },
  ];

  finishedList: ToDo[]=[]
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  addTask(){
    this.todoList.push(
      {
        content:this.todoValue,
        value:false
      }
    );
    this.todoValue='';
  }

  changeTodo(i : number){
    const item = this.todoList.splice(i,1);
    this.finishedList.push(item[0])
    console.log(item)
  }

  changefinished(i : number){
    const item = this.finishedList.splice(i,1);
    this.todoList.push(item[0])
    console.log(item)
  }

  handleDelete(i : number){

  }
    


  confirm2(type:string,i:number) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this task?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
         if(type == 'todoList'){
          this.todoList.splice(i,1);
         }
         else if(type=='finishedList'){
          this.finishedList.splice(i,1);

         }
            
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}








}
