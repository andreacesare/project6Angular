import {inject, Injectable, signal} from "@angular/core";
import {Task, TaskStatus} from "./task.model";
import {LoggingService} from "../logging.service";

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks=signal<Task[]>([]);
  private logginService=inject(LoggingService);

  allTasks=this.tasks.asReadonly();

  addTask(taskData:{title:string,description:string}){
    const newTask:Task={
      ...taskData,
      id:Math.random().toString(),
      status:'OPEN'
    }
    this.tasks.update((oldTask)=>[...oldTask,newTask]);
    this.logginService.log('Bro title inserted:'+taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus:TaskStatus){
    this.tasks.update((oldTasks)=>
      oldTasks.map((task)=>
        task.id===taskId?{...task,status:newStatus}:task));
    this.logginService.log('Bro status updated in:'+newStatus);
  }

}
